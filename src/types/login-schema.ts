import { z } from "zod";

export const loginSchema = z.object({
    email: z.email({ message: 'Ingrese un correo válido' }),
    password: z.string().min(5, { message: "La contraseña debe tener al menos 5 caracteres" }).max(50, { message: "Su contraseña excedio el limite de caracteres" }),
    code: z.optional(z.string()),
});