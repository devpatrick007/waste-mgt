import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials) {
                try {
                    const res = await fetch(
                        "https://pellakes-backend.prospafin.com/api/auth/sign-in/email",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                email: credentials.email,
                                password: credentials.password,
                            }),
                        }
                    )

                    const data = await res.json()

                    if (!res.ok || !data) {
                        return null
                    }

                    return {
                        ...data.user,
                        token: data.token,
                    }
                } catch (error) {
                    return null
                }
            }
        }),
    ],

    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,   // ⭐ ADD THIS

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user
                token.accessToken = user.token
            }
            return token
        },

        async session({ session, token }) {
            session.user = token.user
            session.accessToken = token.accessToken
            return session
        },
    },

    pages: {
        signIn: "/login",
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

// pages: {
//     signIn: "/login", // or remove this entirely
// }