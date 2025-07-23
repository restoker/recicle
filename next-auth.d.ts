import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendUser = DefaultSession['user'] & {
    id: string,
    roles: string[],
    two_factor_enabled: boolean,
    image: string,
    verified: boolean,
    isActive: boolean,
}

declare module 'next-auth' {
    interface Session {
        user: ExtendUser
    }
}