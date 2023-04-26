import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

const authOptions = {
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
            return session;
        },
        async signIn({ user }) {
            await fetch("http://localhost:9999/.netlify/functions/customer", {
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

        }
    }
};
export default NextAuth(authOptions);