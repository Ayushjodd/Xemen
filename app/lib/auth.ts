
import prisma from "@/db/db";
import { Session } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github';
import DiscordProvider from 'next-auth/providers/discord';
import { Keypair } from "@solana/web3.js";

export interface session extends Session {
user : {
    email : string;
    name : string;
    image : string;
    uid : string
}
}

export const authOptions = {
    providers:[
        GoogleProvider ({
         clientId:process.env.GOOGLE_CLIENT_ID || "",
         clientSecret:process.env.GOOGLE_CLIENT_SECRET || ""
        }),
        GitHubProvider({
          clientId: process.env.GITHUB_CLIENT_ID || "",
          clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
        }),
        DiscordProvider({
          clientId: process.env.DISCORD_CLIENT_ID || "",
          clientSecret: process.env.DISCORD_CLIENT_SECRET || ""
        }),
       ],
       callbacks : {
        session : ({session,token}:any) : session => {
        const newSession : session = session as session;
        if(newSession.user && token.uid){
            newSession.user.uid = token.uid || "";
        }
        return newSession;
        },
        async jwt({token,account,profile}:any){
         const user = await prisma.user.findFirst({
            where : {
                sub: account?.providerAccountId || ""
            }
         })

         if(user) {
            token.uid = user.id;
         }
         return token;
        },
        async signIn({ user, account, profile}: any) {
          // console.log("Account: ", account);
          // console.log("Profile: ", profile);
           
          if (account?.provider === "google") {
            // console.log(account?.provider);
            // console.log(account.provider.charAt(0).toUpperCase() + account.provider.slice(1),)
            // console.log(profile?.name);
            // console.log(profile?.picture)
            // console.log(user.email);
            // console.log(user.provider)
            const email = user.email;
            const provider = user.provider;

            if (!email) {
              return false;
            }
            const userDb = await prisma.user.findFirst({
              where: {
                username: email,
                provider:provider
              }
            });
        
            if (userDb) {
              return true;
            }
        
            const keyPair = Keypair.generate();
            const publicKey = keyPair.publicKey.toBase58();
            const privateKey = keyPair.secretKey;
        
            await prisma.user.create({
              data: {
                username: email,
                name: profile?.name,
                //@ts-ignore
                profilePicture: profile?.picture,
                provider: account.provider.charAt(0).toUpperCase() + account.provider.slice(1), // Capitalize provider name
                sub: account.providerAccountId,
                solWallet: {
                  create: {
                    publicKey: publicKey,
                    privateKey: privateKey.toString()
                  }
                },
              }
            });
            return true;
          }

          if(account.provider === "discord"){
            // console.log(account?.provider);
            // console.log(account.provider.charAt(0).toUpperCase() + account.provider.slice(1),)
            // console.log(profile?.email);
            // console.log(profile?.image_url)
            // console.log(account?.providerAccountId);

            const email = profile.email;
            const provider = account.provider.charAt(0).toUpperCase() + account.provider.slice(1);

            if (!email) {
              return false;
            }
            const userDb = await prisma.user.findFirst({
              where: {
                username: email,
                provider:provider.charAt(0).toUpperCase() + provider.slice(1), 
              }
            });

            // console.log(userDb?.username)
            // console.log(userDb?.provider)
        
            if (userDb) {
              return true;
            }
        
            const keyPair = Keypair.generate();
            const publicKey = keyPair.publicKey.toBase58();
            const privateKey = keyPair.secretKey;
        
            await prisma.user.create({
              data: {
                username: email,
                name: profile?.username,
                //@ts-ignore
                profilePicture: profile?.image_url,
                provider: provider.charAt(0).toUpperCase() + provider.slice(1), 
                sub: account.providerAccountId,
                solWallet: {
                  create: {
                    publicKey: publicKey,
                    privateKey: privateKey.toString()
                  }
                },
              }
            });
            return true;
          }

          if(account?.provider === "github"){
              // console.log(account?.provider);
              // console.log(account.provider.charAt(0).toUpperCase() + account.provider.slice(1),)
              // console.log(profile.login);
              // console.log(profile.avatar_url)
              const githubUsername = profile.login;
              const provider = account?.provider;
  
              if (!githubUsername) {
                return false;
              }
              const userDb = await prisma.user.findFirst({
                where: {
                  username: githubUsername,
                  provider:provider.charAt(0).toUpperCase() + provider.slice(1),
                }
              });
          
              if (userDb) {
                return true;
              }
          
              const keyPair = Keypair.generate();
              const publicKey = keyPair.publicKey.toBase58();
              const privateKey = keyPair.secretKey;
          
              await prisma.user.create({
                data: {
                  username: githubUsername,
                  name: profile?.name,
                  //@ts-ignore
                  profilePicture: profile?.avatar_url,
                  provider: provider.charAt(0).toUpperCase() + account.provider.slice(1), 
                  sub: account.providerAccountId,
                  solWallet: {
                    create: {
                      publicKey: publicKey,
                      privateKey: privateKey.toString()
                    }
                  },
                }
              });
              return true;
          }
        
          return false;
        }
        
       }
}

