import { z } from "zod";

export const createMessageFormSchema = z.object({
	content: z
		.string()
		.min(1, "Мессеж оруулна уу")
		.max(2000, "Мессеж хамгийн ихдээ 2000 тэмдэгт байна"),
});

export type CreateMessageFormData = z.infer<typeof createMessageFormSchema>;
