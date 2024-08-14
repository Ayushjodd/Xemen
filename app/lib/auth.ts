import prisma from "@/db/db";
import { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";
import { Keypair } from "@solana/web3.js";
import { Provider } from "@prisma/client";

export interface session extends Session {
  user: {
    email: string;
    name: string;
    image: string;
    uid: string;
  };
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID || "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    session: ({ session, token }: any): session => {
      const newSession: session = session as session;
      if (newSession.user && token.uid) {
        newSession.user.uid = token.uid || "";
      }
      return newSession;
    },
    async jwt({ token, account }: any) {
      if (account) {
        const user = await prisma.user.findUnique({
          where: {
            username_provider: {
              username: token.email || token.name,
              provider: (account.provider.charAt(0).toUpperCase() +
                account.provider.slice(1)) as Provider,
            },
          },
        });
        if (user) {
          token.uid = user.id;
        }
      }
      return token;
    },
    async signIn({ user, account, profile }: any) {
      if (!account || !profile) return false;

      const provider = (account.provider.charAt(0).toUpperCase() +
        account.provider.slice(1)) as Provider;
      let username, email, name, profilePicture;

      if (account.provider === "google") {
        username = user.email;
        name = profile?.name;
        profilePicture = profile?.picture;
      } else if (account.provider === "discord") {
        username = profile.email;
        name = profile?.username;
        profilePicture = profile?.image_url;
      } else if (account.provider === "github") {
        username = profile.login;
        name = profile?.name;
        profilePicture = profile?.avatar_url;
      } else {
        return false; // Unsupported provider
      }

      if (!username) return false;

      try {
        const keyPair = Keypair.generate();
        const publicKey = keyPair.publicKey.toBase58();
        const privateKey = keyPair.secretKey.toString();

        const user = await prisma.user.upsert({
          where: {
            username_provider: {
              username,
              provider,
            },
          },
          update: {}, // No updates if user exists
          create: {
            username,
            name,
            profilePicture,
            provider,
            sub: account.providerAccountId,
            solWallet: {
              create: {
                publicKey,
                privateKey,
              },
            },
          },
        });

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
  },
};
