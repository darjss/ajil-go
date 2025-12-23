import { z } from "zod";

export const signInSchema = z.object({
	email: z.string().email("Имэйл хаяг буруу байна"),
	password: z.string().min(8, "Нууц үг хамгийн багадаа 8 тэмдэгт байх ёстой"),
});

export type SignInFormData = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
	name: z.string().min(2, "Нэр хамгийн багадаа 2 тэмдэгт байх ёстой"),
	email: z.string().email("Имэйл хаяг буруу байна"),
	password: z.string().min(8, "Нууц үг хамгийн багадаа 8 тэмдэгт байх ёстой"),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
