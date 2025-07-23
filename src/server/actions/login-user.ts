'use server';

import { actionClient } from "@/lib/safe-action";
import { loginSchema } from "@/types/login-schema";

export const loginWithEmailAndPassword = actionClient
    .inputSchema(loginSchema)
    .action(async ({ parsedInput: { email, password } }) => {

        try {
            const user = await fetch("http://localhost:3000/users/login", {
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
            console.log(userJson);
            // if (!userJson) return {
            //     ok: false,
            //     msg: 'Error al iniciar sesión',
            // }
            // if (userJson.twoFactor) {
            //     return {
            //         ok: true,
            //         msg: 'Login exitoso',
            //         user: userJson.user,
            //         twoFactor: userJson.twoFactor,
            //     }
            // }
            return {
                ok: false,
                msg: 'Error al iniciar sesión',
            }
        } catch (error) {
            return {
                ok: false,
                msg: 'Error al iniciar sesión',
            }
        }

    });
