import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({
            name: 'Manager Login',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                const user = { id: '1', name: 'Manager' };
                if (credentials.username === process.env.MANAGER_USERNAME &&
                    credentials.password === process.env.MANAGER_PASSWORD)
                    return user;
                else
                    return null;
            }
        }),
        CredentialsProvider({
            name: 'FoodPrep Login',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                const user = { id: '2', name: 'FoodPrep' };
                if (credentials.username === process.env.FOODPREP_USERNAME &&
                    credentials.password === process.env.FOODPREP_PASSWORD)
                    return user;
                else
                    return null;
            }
        })
    ],
    callbacks: {
        async session({session, token}) {
            session.user.userID = token.sub;
            return session;
        }
    }
};
export default (req, res) => NextAuth(req, res, authOptions);