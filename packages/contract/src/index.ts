import { z } from "zod";

// ============================================
// ENUMS
// ============================================

export const TaskStatusSchema = z.enum([
	"OPEN",
	"ASSIGNED",
	"IN_PROGRESS",
	"COMPLETED",
	"REVIEWED",
	"CANCELLED",
	"DISPUTED",
]);
export type TaskStatus = z.infer<typeof TaskStatusSchema>;

export const BidStatusSchema = z.enum([
	"PENDING",
	"ACCEPTED",
	"REJECTED",
	"WITHDRAWN",
]);
export type BidStatus = z.infer<typeof BidStatusSchema>;

export const ReviewTypeSchema = z.enum([
	"CLIENT_TO_WORKER",
	"WORKER_TO_CLIENT",
]);
export type ReviewType = z.infer<typeof ReviewTypeSchema>;

export const PaymentStatusSchema = z.enum([
	"PENDING",
	"HELD",
	"RELEASED",
	"REFUNDED",
]);
export type PaymentStatus = z.infer<typeof PaymentStatusSchema>;

// ============================================
// AUTH SCHEMAS
// ============================================

export const UserSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string(),
	emailVerified: z.boolean().default(false),
	image: z.string().nullable(),
	createdAt: z.date(),
	updatedAt: z.date(),

	// Profile fields
	bio: z.string().nullable(),
	phone: z.string().nullable(),
	address: z.string().nullable(),
	city: z.string().nullable(),
	latitude: z.number().nullable(),
	longitude: z.number().nullable(),
	avgRatingAsClient: z.number().default(0),
	avgRatingAsWorker: z.number().default(0),
	completedTasksAsWorker: z.number().int().default(0),
	completedTasksAsClient: z.number().int().default(0),
});
export type User = z.infer<typeof UserSchema>;

export const SessionSchema = z.object({
	id: z.string(),
	expiresAt: z.date(),
	token: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
	ipAddress: z.string().nullable(),
	userAgent: z.string().nullable(),
	userId: z.string(),
});
export type Session = z.infer<typeof SessionSchema>;

export const AccountSchema = z.object({
	id: z.string(),
	accountId: z.string(),
	providerId: z.string(),
	userId: z.string(),
	accessToken: z.string().nullable(),
	refreshToken: z.string().nullable(),
	idToken: z.string().nullable(),
	accessTokenExpiresAt: z.date().nullable(),
	refreshTokenExpiresAt: z.date().nullable(),
	scope: z.string().nullable(),
	password: z.string().nullable(),
	createdAt: z.date(),
	updatedAt: z.date(),
});
export type Account = z.infer<typeof AccountSchema>;

export const VerificationSchema = z.object({
	id: z.string(),
	identifier: z.string(),
	value: z.string(),
	expiresAt: z.date(),
	createdAt: z.date(),
	updatedAt: z.date(),
});
export type Verification = z.infer<typeof VerificationSchema>;

// ============================================
// MARKETPLACE SCHEMAS
// ============================================

export const SkillSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().nullable(),
	createdAt: z.date(),
});
export type Skill = z.infer<typeof SkillSchema>;

export const CustomSkillSchema = z.object({
	id: z.string(),
	name: z.string(),
	createdAt: z.date(),
});
export type CustomSkill = z.infer<typeof CustomSkillSchema>;

export const UserSkillSchema = z.object({
	id: z.string(),
	userId: z.string(),
	skillId: z.string().nullable(),
	customSkillId: z.string().nullable(),
	createdAt: z.date(),
});
export type UserSkill = z.infer<typeof UserSkillSchema>;

export const CategorySchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().nullable(),
	iconUrl: z.string().nullable(),
	createdAt: z.date(),
});
export type Category = z.infer<typeof CategorySchema>;

export const TaskSchema = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string(),
	budgetMin: z.number(),
	budgetMax: z.number().nullable(),
	finalPrice: z.number().nullable(),
	isRemote: z.boolean().default(true),
	address: z.string().nullable(),
	city: z.string().nullable(),
	latitude: z.number().nullable(),
	longitude: z.number().nullable(),
	deadline: z.date().nullable(),
	estimatedHours: z.number().nullable(),
	status: TaskStatusSchema.default("OPEN"),
	posterId: z.string(),
	categoryId: z.string(),
	assignedBidId: z.string().nullable(),
	createdAt: z.date(),
	updatedAt: z.date(),
});
export type Task = z.infer<typeof TaskSchema>;

export const TaskSkillSchema = z.object({
	id: z.string(),
	taskId: z.string(),
	skillId: z.string().nullable(),
	customSkillId: z.string().nullable(),
});
export type TaskSkill = z.infer<typeof TaskSkillSchema>;

export const TaskAttachmentSchema = z.object({
	id: z.string(),
	taskId: z.string(),
	fileName: z.string(),
	fileUrl: z.string(),
	fileType: z.string(),
	fileSize: z.number().int(),
	createdAt: z.date(),
});
export type TaskAttachment = z.infer<typeof TaskAttachmentSchema>;

export const TaskBidSchema = z.object({
	id: z.string(),
	taskId: z.string(),
	bidderId: z.string(),
	amount: z.number(),
	message: z.string(),
	estimatedHours: z.number().nullable(),
	status: BidStatusSchema.default("PENDING"),
	createdAt: z.date(),
	updatedAt: z.date(),
});
export type TaskBid = z.infer<typeof TaskBidSchema>;

export const ReviewSchema = z.object({
	id: z.string(),
	taskId: z.string(),
	authorId: z.string(),
	targetId: z.string(),
	rating: z.number().int(), // 1-5
	comment: z.string().nullable(),
	type: ReviewTypeSchema,
	createdAt: z.date(),
});
export type Review = z.infer<typeof ReviewSchema>;

export const MessageSchema = z.object({
	id: z.string(),
	taskId: z.string(),
	senderId: z.string(),
	content: z.string(),
	isRead: z.boolean().default(false),
	createdAt: z.date(),
});
export type Message = z.infer<typeof MessageSchema>;

export const PaymentSchema = z.object({
	id: z.string(),
	taskId: z.string(),
	amount: z.number(),
	status: PaymentStatusSchema.default("PENDING"),
	payerId: z.string(), // task poster
	payeeId: z.string(), // worker
	createdAt: z.date(),
	completedAt: z.date().nullable(),
});
export type Payment = z.infer<typeof PaymentSchema>;

// ============================================
// RELATION SCHEMAS (for complete data fetching)
// ============================================

// User with relations
export const UserWithRelationsSchema = UserSchema.extend({
	sessions: z.array(SessionSchema).optional(),
	accounts: z.array(AccountSchema).optional(),
	skills: z.array(UserSkillSchema).optional(),
	postedTasks: z.array(TaskSchema).optional(),
	bids: z.array(TaskBidSchema).optional(),
	reviewsGiven: z.array(ReviewSchema).optional(),
	reviewsReceived: z.array(ReviewSchema).optional(),
	messagesSent: z.array(MessageSchema).optional(),
});
export type UserWithRelations = z.infer<typeof UserWithRelationsSchema>;

// Task with relations
export const TaskWithRelationsSchema = TaskSchema.extend({
	poster: UserSchema.optional(),
	category: CategorySchema.optional(),
	assignedBid: TaskBidSchema.optional(),
	skills: z.array(TaskSkillSchema).optional(),
	bids: z.array(TaskBidSchema).optional(),
	reviews: z.array(ReviewSchema).optional(),
	messages: z.array(MessageSchema).optional(),
	attachments: z.array(TaskAttachmentSchema).optional(),
	payment: PaymentSchema.optional(),
});
export type TaskWithRelations = z.infer<typeof TaskWithRelationsSchema>;

// TaskBid with relations
export const TaskBidWithRelationsSchema = TaskBidSchema.extend({
	task: TaskSchema.optional(),
	bidder: UserSchema.optional(),
	assignedTask: TaskSchema.optional(),
});
export type TaskBidWithRelations = z.infer<typeof TaskBidWithRelationsSchema>;

// Review with relations
export const ReviewWithRelationsSchema = ReviewSchema.extend({
	task: TaskSchema.optional(),
	author: UserSchema.optional(),
	target: UserSchema.optional(),
});
export type ReviewWithRelations = z.infer<typeof ReviewWithRelationsSchema>;

// Message with relations
export const MessageWithRelationsSchema = MessageSchema.extend({
	task: TaskSchema.optional(),
	sender: UserSchema.optional(),
});
export type MessageWithRelations = z.infer<typeof MessageWithRelationsSchema>;

// UserSkill with relations
export const UserSkillWithRelationsSchema = UserSkillSchema.extend({
	user: UserSchema.optional(),
	skill: SkillSchema.optional(),
	customSkill: CustomSkillSchema.optional(),
});
export type UserSkillWithRelations = z.infer<
	typeof UserSkillWithRelationsSchema
>;

// TaskSkill with relations
export const TaskSkillWithRelationsSchema = TaskSkillSchema.extend({
	task: TaskSchema.optional(),
	skill: SkillSchema.optional(),
	customSkill: CustomSkillSchema.optional(),
});
export type TaskSkillWithRelations = z.infer<
	typeof TaskSkillWithRelationsSchema
>;
