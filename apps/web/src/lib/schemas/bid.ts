import { z } from "zod";

export const createBidFormSchema = z.object({
	amount: z.coerce
		.number()
		.positive("Үнийн санал 0-ээс их байх ёстой")
		.min(1, "Үнийн санал оруулна уу"),
	message: z
		.string()
		.min(10, "Мессеж хамгийн багадаа 10 тэмдэгт байх ёстой")
		.max(2000, "Мессеж хамгийн ихдээ 2000 тэмдэгт байх ёстой"),
	estimatedHours: z.coerce.number().positive().optional().or(z.literal("")),
});

export type CreateBidFormData = z.infer<typeof createBidFormSchema>;

export const updateBidFormSchema = createBidFormSchema.partial();

export type UpdateBidFormData = z.infer<typeof updateBidFormSchema>;
