import { authOptions } from '@/app/lib/auth'
import NextAuth from 'next-auth/next'

export const maxDuration =60;
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }