# Xemen

## About

**Xemen** is a versatile project, designed to offer users a seamless experience in managing their Solana wallets and conducting transactions. In this project, users can sign up, receive a Solana wallet, and use their wallet balance to purchase products or transfer funds (future feature). This project also incorporates e-commerce functionality, allowing users to sell or purchase products on the platform.

While currently focused on Solana Devnet transactions for hackathon purposes, Xemen provides a solid foundation for building a robust blockchain-based payment and e-commerce solution.

## Tech Stack

- **Next.js** - Full-stack framework for building the backend and frontend.
- **Prisma ORM** - Object-relational mapping for PostgreSQL database.
- **PostgreSQL** - Database for storing user and transaction data.
- **Next Auth** - Authentication system for secure user login.
- **Solana** - Blockchain platform for managing Solana wallets and transactions.

- **React.js** - JavaScript framework for building user interfaces.
- **ShadCN** - A utility-first CSS framework for building responsive designs.
- **Tailwind CSS** - Utility-first CSS framework for styling.

## Features
- **Solana Wallet Integration**: Upon signup, users receive a Solana wallet.
- **Transaction Logic**: Users can send and receive money using their Solana wallet balance (as per now via selling or purchasing,In future will improve it by wallet to wallet transaction).
- **E-commerce Functionality**: Users can sell and purchase products.
- **Devnet Transactions**: Currently, transactions are conducted on Solana Devnet for testing and development purposes.
- **Hashed Passwords**: Passwords are hashed before storing in the database for enhanced security.

## Setup Instructions

### Clone the Repository

```bash
git clone <repo_url>
cd Xemen
```

### Install Dependencies

```bash
npm install
```

### Environment Setup

- Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

- Update the `.env` file with the necessary environment variables, including database credentials and Solana API keys.

### Database Setup

- Run the following commands to set up your database schema and generate Prisma client:

```bash
npx prisma migrate dev
```

or

```bash
npx prisma db push
```

- If you need to regenerate the Prisma client, run:

```bash
npx prisma generate
```

### Running the Project

- For development mode, run:

```bash
npm run dev
```

- For production mode, build and start the server:

```bash
npm run build
npm run start
```

## Usage

- **Sign Up**: Create an account and receive a Solana wallet.
- **Add Money**: Add funds to your Solana wallet from the Solana Devnet.
- **Make Purchases**: Use your wallet balance to purchase products on the platform.
- **Sell Products**: List products for sale on the platform.

## Future Improvements

- **Mainnet Integration**: Transition from Solana Devnet to Mainnet for real-world transactions.
- **Wallet-to-Wallet Transfers**: Implement the ability to transfer funds between wallets.
- **Additional Payment Methods**: Integrate more payment options like UPI or traditional bank transfers.

## License

This project is licensed under the [MIT License](LICENSE).

---


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
