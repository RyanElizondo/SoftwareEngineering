import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
    ],
    session: {
        jwt: true,
        maxAge: 60 * 60,    // Session expires in 1 hour
    },
};
export default NextAuth(authOptions);