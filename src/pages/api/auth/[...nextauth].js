import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import url from 'url';

const customerAuthOptions = {
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
        })
    ],
    callbacks: {
        async session({session, token}) {
            session.user.userID = token.sub;
            session.user.role = token.role;
            return session;
        },
        async signIn({ user }) {
            await fetch("https://expressocafeweb.netlify.app/.netlify/functions/customer", {
                method: "PUT",
                body: JSON.stringify(user)
            })
                .then((response) => response.json())
                .then(data => {
                    console.log(data)
                })
                .catch(error => {
                    console.log(error)
                })
            return true

        },
        async jwt({token, user}) {
            if(user) token.role = user.role;
            return token;
        }
    }
};

const staffAuthOptions = {
    providers: [
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
        async signIn({ user }) {
            console.log("Staff signed in user: ");
            console.log(user);

        },
        async jwt({token, user}) {
            if(user) token.role = user.role;
            return token;
        }
    }
};

const allAuthOptions = {
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
        async signIn({ user }) {
            await fetch("https://expressocafeweb.netlify.app/.netlify/functions/customer", {
                method: "PUT",
                body: JSON.stringify(user)
                })
            return true

        },
            async jwt({token, user}) {
                if(user) token.role = user.role;
                return token;
            }
        }
    };

export default (req, res) => {
    try {
        const referringUrl = req.headers.referer;
        const referringUrlObj = url.parse(referringUrl);
        const referringPath = referringUrlObj.pathname;
        if(referringPath === '/staff/login') {
            NextAuth(req, res, staffAuthOptions);
        } else if(referringPath === '/begin') {
            NextAuth(req, res, customerAuthOptions);
        } else {
            NextAuth(req, res, allAuthOptions);
        }
    } catch(e) {
        NextAuth(req, res, allAuthOptions);
    }

};