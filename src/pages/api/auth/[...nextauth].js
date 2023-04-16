import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
    ],
    /*session: {
        strategy: 'jwt'
    },*/
    callbacks: {
        async session({session, token}) {
            session.user.userID = token.sub;
            return session
        },
    }
};
export default NextAuth(authOptions);