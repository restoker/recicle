import Credentials from "next-auth/providers/credentials"
import NextAuth from "next-auth"
import { loginSchema } from "@/types/login-schema"
import bcrypt from 'bcrypt'

export const { handlers, auth, signIn, signOut, unstable_update } = NextAuth({
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (!token.sub) return token;
            const existUser = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: token.email,
                    password: token.password,
                }),
            });
            const existUserJson = await existUser.json();
            if (!existUserJson) return token;
            const existsAccount = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: token.email,
                    password: token.password,
                }),
            });
            const existsAccountJson = await existsAccount.json();

            // if (user) {
            //     token.isOauth = !!existsAccount;
            //     return token
            // }
            // console.log(existsAccount);
            token.name = existUserJson.name;
            token.email = existUserJson.email;
            token.role = existUserJson.role;
            token.isTwoFactorEnabled = existUserJson.twoFactorEnabled;
            token.image = existUserJson.image;

            return token;

        },
        async session({ session, user, token }) {
            if (session && token.sub) {
                session.user.id = token.sub;
            }
            if (session.user && token.role) {
                session.user.role = token.role as string;
            }
            if (session.user) {
                session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
                session.user.name = token.name;
                session.user.email = token.email as string;
                session.user.image = token.image as string;
            }
            return session;
        },
    },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                const validatedFields = loginSchema.safeParse(credentials);

                if (validatedFields.success) {
                    const { email, password, } = validatedFields.data;

                    const user = await fetch("http://localhost:3000/api/auth/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email,
                            password,
                        }),
                    });
                    const userJson = await user.json();

                    if (!userJson || !userJson.password) return null;

                    // verificar el password
                    const passCorrect = await bcrypt.compare(password, userJson.password);

                    if (!passCorrect) return null;
                    const { password: otro, ...rest } = userJson;
                    return rest;
                }
                return null;
                // logic to salt and hash password
                // const pwHash = saltAndHashPassword(credentials.password)
                // logic to verify if user exists
                // user = await getUserFromDb(credentials.email, pwHash)
                // if (!user) {
                //     // No user found, so this is their first attempt to login
                //     // meaning this is also the place you could do registration
                //     throw new Error("User not found.")
                // }
                // // return user object with the their profile data
                // return user;
            },

        }),
    ],
})