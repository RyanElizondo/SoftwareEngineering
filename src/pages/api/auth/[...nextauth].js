import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    role: 'customer'
                }
            }
        }),
        CredentialsProvider({
            id: 'manager-login',
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
            id: 'foodprep-login',
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
            session.user.role = token.role;
            return session;
        },
        async jwt({token, user}) {
            if(user) token.role = user.role;
            return token;
        }
    }
};
export default (req, res) => NextAuth(req, res, authOptions);