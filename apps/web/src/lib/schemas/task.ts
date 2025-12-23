import { z } from "zod";

// Base schema without refinements for partial/update use
const createTaskBaseSchema = z.object({
	title: z
		.string()
		.min(10, "Гарчиг хамгийн багадаа 10 тэмдэгт байх ёстой")
		.max(200, "Гарчиг хамгийн ихдээ 200 тэмдэгт байх ёстой"),
	description: z
		.string()
		.min(30, "Тайлбар хамгийн багадаа 30 тэмдэгт байх ёстой")
		.max(5000, "Тайлбар хамгийн ихдээ 5000 тэмдэгт байх ёстой"),
	categoryId: z.string().min(1, "Ангилал сонгоно уу"),
	budgetMin: z.coerce
		.number()
		.positive("Доод төсөв 0-ээс их байх ёстой")
		.min(1, "Төсөв оруулна уу"),
	budgetMax: z.coerce.number().positive().optional().or(z.literal("")),
	isRemote: z.boolean(),
	city: z.string().max(100).optional(),
	address: z.string().max(200).optional(),
	deadline: z.string().optional(),
	estimatedHours: z.coerce.number().positive().optional().or(z.literal("")),
	skillIds: z.array(z.string()),
});

export const createTaskFormSchema = createTaskBaseSchema
	.refine(
		(data) => {
			if (data.budgetMax === undefined || data.budgetMax === "") return true;
			return data.budgetMax >= data.budgetMin;
		},
		{
			message: "Дээд төсөв доод төсвөөс их байх ёстой",
			path: ["budgetMax"],
		},
	)
	.refine(
		(data) => {
			if (data.isRemote) return true;
			return data.city && data.city.trim().length > 0;
		},
		{
			message: "Хот оруулна уу",
			path: ["city"],
		},
	);

export type CreateTaskFormData = z.infer<typeof createTaskFormSchema>;

export const updateTaskFormSchema = createTaskBaseSchema.partial();

export type UpdateTaskFormData = z.infer<typeof updateTaskFormSchema>;
