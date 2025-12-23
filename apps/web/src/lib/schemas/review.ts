import { z } from "zod";

export const createReviewFormSchema = z.object({
	rating: z.coerce
		.number()
		.int()
		.min(1, "Үнэлгээ 1-ээс 5 хооронд байх ёстой")
		.max(5, "Үнэлгээ 1-ээс 5 хооронд байх ёстой"),
	comment: z
		.string()
		.max(1000, "Сэтгэгдэл хамгийн ихдээ 1000 тэмдэгт байна")
		.optional(),
});

export type CreateReviewFormData = z.infer<typeof createReviewFormSchema>;

export const updateReviewFormSchema = createReviewFormSchema.partial();

export type UpdateReviewFormData = z.infer<typeof updateReviewFormSchema>;
