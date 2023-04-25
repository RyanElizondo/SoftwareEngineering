import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        Credentials({
            name: 'Manager Login',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            authorize: async (credentials) => {
                const { username, password } = credentials;
                if (username === process.env.foodprep_username &&
                    password === process.env.foodprep_password) {
                    return Promise.resolve({ id: 1, name: 'FoodPrep' })
                } else if (username === process.env.manager_username &&
                            password === process.env.manager_password) {
                    return Promise.resolve({ id: 2, name: 'Manager' })
                } else return Promise.resolve(null);
            }
        })
    ],
    /*session: {
        strategy: 'jwt'
    },*/
    callbacks: {
        async session({session, token}) {
            session.user.userID = token.sub;
            return session;
        }
    }
};
export default (req, res) => NextAuth(req, res, authOptions);