import { z } from "zod";

export const updateProfileFormSchema = z.object({
	name: z
		.string()
		.min(1, "Нэр оруулна уу")
		.max(100, "Нэр хамгийн ихдээ 100 тэмдэгт байна")
		.optional(),
	bio: z
		.string()
		.max(500, "Танилцуулга хамгийн ихдээ 500 тэмдэгт байна")
		.optional(),
	phone: z
		.string()
		.max(20, "Утасны дугаар хамгийн ихдээ 20 тэмдэгт байна")
		.optional(),
	address: z
		.string()
		.max(200, "Хаяг хамгийн ихдээ 200 тэмдэгт байна")
		.optional(),
	city: z.string().max(100, "Хот хамгийн ихдээ 100 тэмдэгт байна").optional(),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileFormSchema>;
