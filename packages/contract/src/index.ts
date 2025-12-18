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
// COMMON SCHEMAS
// ============================================

// Common ID param schema
export const IdParamsSchema = z.object({
	id: z.string(),
});
export type IdParams = z.infer<typeof IdParamsSchema>;

// Common pagination query schema
export const PaginationQuerySchema = z.object({
	page: z.coerce.number().int().positive().default(1),
	limit: z.coerce.number().int().positive().max(100).default(20),
});
export type PaginationQuery = z.infer<typeof PaginationQuerySchema>;

// ============================================
// AUTH / USER SCHEMAS
// ============================================

export const UserSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string(),
	emailVerified: z.boolean().default(false),
	image: z.string().nullable(),
	createdAt: z.date(),
	updatedAt: z.date(),
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

// User API Schemas
export const GetUsersQuerySchema = PaginationQuerySchema.extend({
	city: z.string().optional(),
	search: z.string().optional(),
});
export type GetUsersQuery = z.infer<typeof GetUsersQuerySchema>;

export const UpdateUserBodySchema = z.object({
	name: z.string().min(1).max(100).optional(),
	bio: z.string().max(500).optional(),
	phone: z.string().max(20).optional(),
	address: z.string().max(200).optional(),
	city: z.string().max(100).optional(),
	latitude: z.number().min(-90).max(90).optional(),
	longitude: z.number().min(-180).max(180).optional(),
});
export type UpdateUserBody = z.infer<typeof UpdateUserBodySchema>;

// ============================================
// CATEGORY SCHEMAS
// ============================================

export const CategorySchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().nullable(),
	iconUrl: z.string().nullable(),
	createdAt: z.date(),
});
export type Category = z.infer<typeof CategorySchema>;

// Category API Schemas
export const GetCategoriesQuerySchema = PaginationQuerySchema.extend({
	limit: z.coerce.number().int().positive().max(100).default(50),
	search: z.string().optional(),
});
export type GetCategoriesQuery = z.infer<typeof GetCategoriesQuerySchema>;

export const CreateCategoryBodySchema = z.object({
	name: z.string().min(1).max(100),
	description: z.string().max(500).optional(),
	iconUrl: z.string().url().optional(),
});
export type CreateCategoryBody = z.infer<typeof CreateCategoryBodySchema>;

export const UpdateCategoryBodySchema = z.object({
	name: z.string().min(1).max(100).optional(),
	description: z.string().max(500).optional(),
	iconUrl: z.string().url().optional(),
});
export type UpdateCategoryBody = z.infer<typeof UpdateCategoryBodySchema>;

// ============================================
// SKILL SCHEMAS
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

// Skill API Schemas
export const GetSkillsQuerySchema = PaginationQuerySchema.extend({
	limit: z.coerce.number().int().positive().max(100).default(50),
	search: z.string().optional(),
});
export type GetSkillsQuery = z.infer<typeof GetSkillsQuerySchema>;

export const CreateSkillBodySchema = z.object({
	name: z.string().min(1).max(100),
	description: z.string().max(500).optional(),
});
export type CreateSkillBody = z.infer<typeof CreateSkillBodySchema>;

export const UpdateSkillBodySchema = z.object({
	name: z.string().min(1).max(100).optional(),
	description: z.string().max(500).optional(),
});
export type UpdateSkillBody = z.infer<typeof UpdateSkillBodySchema>;

// ============================================
// TASK SCHEMAS
// ============================================

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

// Task API Schemas
export const GetTasksQuerySchema = PaginationQuerySchema.extend({
	status: TaskStatusSchema.optional(),
	categoryId: z.string().optional(),
	posterId: z.string().optional(),
	city: z.string().optional(),
	isRemote: z.coerce.boolean().optional(),
	minBudget: z.coerce.number().positive().optional(),
	maxBudget: z.coerce.number().positive().optional(),
	search: z.string().optional(),
});
export type GetTasksQuery = z.infer<typeof GetTasksQuerySchema>;

export const CreateTaskBodySchema = z.object({
	title: z.string().min(1).max(200),
	description: z.string().min(1).max(5000),
	budgetMin: z.number().positive(),
	budgetMax: z.number().positive().optional(),
	isRemote: z.boolean().default(true),
	address: z.string().max(200).optional(),
	city: z.string().max(100).optional(),
	latitude: z.number().min(-90).max(90).optional(),
	longitude: z.number().min(-180).max(180).optional(),
	deadline: z.coerce.date().optional(),
	estimatedHours: z.number().positive().optional(),
	categoryId: z.string(),
	posterId: z.string(),
	skillIds: z.array(z.string()).optional(),
});
export type CreateTaskBody = z.infer<typeof CreateTaskBodySchema>;

export const UpdateTaskBodySchema = z.object({
	title: z.string().min(1).max(200).optional(),
	description: z.string().min(1).max(5000).optional(),
	budgetMin: z.number().positive().optional(),
	budgetMax: z.number().positive().optional(),
	finalPrice: z.number().positive().optional(),
	isRemote: z.boolean().optional(),
	address: z.string().max(200).optional(),
	city: z.string().max(100).optional(),
	latitude: z.number().min(-90).max(90).optional(),
	longitude: z.number().min(-180).max(180).optional(),
	deadline: z.coerce.date().optional(),
	estimatedHours: z.number().positive().optional(),
	status: TaskStatusSchema.optional(),
	categoryId: z.string().optional(),
	assignedBidId: z.string().optional(),
});
export type UpdateTaskBody = z.infer<typeof UpdateTaskBodySchema>;

// ============================================
// BID SCHEMAS
// ============================================

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

// Bid API Schemas
export const GetBidsQuerySchema = PaginationQuerySchema.extend({
	taskId: z.string().optional(),
	bidderId: z.string().optional(),
	status: BidStatusSchema.optional(),
});
export type GetBidsQuery = z.infer<typeof GetBidsQuerySchema>;

export const CreateBidBodySchema = z.object({
	taskId: z.string(),
	bidderId: z.string(),
	amount: z.number().positive(),
	message: z.string().min(1).max(2000),
	estimatedHours: z.number().positive().optional(),
});
export type CreateBidBody = z.infer<typeof CreateBidBodySchema>;

export const UpdateBidBodySchema = z.object({
	amount: z.number().positive().optional(),
	message: z.string().min(1).max(2000).optional(),
	estimatedHours: z.number().positive().optional(),
	status: BidStatusSchema.optional(),
});
export type UpdateBidBody = z.infer<typeof UpdateBidBodySchema>;

// ============================================
// REVIEW SCHEMAS
// ============================================

export const ReviewSchema = z.object({
	id: z.string(),
	taskId: z.string(),
	authorId: z.string(),
	targetId: z.string(),
	rating: z.number().int(),
	comment: z.string().nullable(),
	type: ReviewTypeSchema,
	createdAt: z.date(),
});
export type Review = z.infer<typeof ReviewSchema>;

// Review API Schemas
export const GetReviewsQuerySchema = PaginationQuerySchema.extend({
	taskId: z.string().optional(),
	authorId: z.string().optional(),
	targetId: z.string().optional(),
	type: ReviewTypeSchema.optional(),
	minRating: z.coerce.number().int().min(1).max(5).optional(),
});
export type GetReviewsQuery = z.infer<typeof GetReviewsQuerySchema>;

export const CreateReviewBodySchema = z.object({
	taskId: z.string(),
	authorId: z.string(),
	targetId: z.string(),
	rating: z.number().int().min(1).max(5),
	comment: z.string().max(1000).optional(),
	type: ReviewTypeSchema,
});
export type CreateReviewBody = z.infer<typeof CreateReviewBodySchema>;

export const UpdateReviewBodySchema = z.object({
	rating: z.number().int().min(1).max(5).optional(),
	comment: z.string().max(1000).optional(),
});
export type UpdateReviewBody = z.infer<typeof UpdateReviewBodySchema>;

// ============================================
// MESSAGE SCHEMAS
// ============================================

export const MessageSchema = z.object({
	id: z.string(),
	taskId: z.string(),
	senderId: z.string(),
	content: z.string(),
	isRead: z.boolean().default(false),
	createdAt: z.date(),
});
export type Message = z.infer<typeof MessageSchema>;

// Message API Schemas
export const GetMessagesQuerySchema = PaginationQuerySchema.extend({
	limit: z.coerce.number().int().positive().max(100).default(50),
	taskId: z.string().optional(),
	senderId: z.string().optional(),
	isRead: z.coerce.boolean().optional(),
});
export type GetMessagesQuery = z.infer<typeof GetMessagesQuerySchema>;

export const CreateMessageBodySchema = z.object({
	taskId: z.string(),
	senderId: z.string(),
	content: z.string().min(1).max(2000),
});
export type CreateMessageBody = z.infer<typeof CreateMessageBodySchema>;

export const UpdateMessageBodySchema = z.object({
	content: z.string().min(1).max(2000).optional(),
	isRead: z.boolean().optional(),
});
export type UpdateMessageBody = z.infer<typeof UpdateMessageBodySchema>;

export const MarkMessagesReadBodySchema = z.object({
	messageIds: z.array(z.string()).min(1),
});
export type MarkMessagesReadBody = z.infer<typeof MarkMessagesReadBodySchema>;

// ============================================
// PAYMENT SCHEMAS
// ============================================

export const PaymentSchema = z.object({
	id: z.string(),
	taskId: z.string(),
	amount: z.number(),
	status: PaymentStatusSchema.default("PENDING"),
	payerId: z.string(),
	payeeId: z.string(),
	createdAt: z.date(),
	completedAt: z.date().nullable(),
});
export type Payment = z.infer<typeof PaymentSchema>;

// Payment API Schemas
export const GetPaymentsQuerySchema = PaginationQuerySchema.extend({
	taskId: z.string().optional(),
	payerId: z.string().optional(),
	payeeId: z.string().optional(),
	status: PaymentStatusSchema.optional(),
});
export type GetPaymentsQuery = z.infer<typeof GetPaymentsQuerySchema>;

export const CreatePaymentBodySchema = z.object({
	taskId: z.string(),
	amount: z.number().positive(),
	payerId: z.string(),
	payeeId: z.string(),
});
export type CreatePaymentBody = z.infer<typeof CreatePaymentBodySchema>;

export const UpdatePaymentBodySchema = z.object({
	status: PaymentStatusSchema.optional(),
	completedAt: z.coerce.date().optional(),
});
export type UpdatePaymentBody = z.infer<typeof UpdatePaymentBodySchema>;

// ============================================
// RELATION SCHEMAS (for complete data fetching)
// ============================================

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

export const TaskBidWithRelationsSchema = TaskBidSchema.extend({
	task: TaskSchema.optional(),
	bidder: UserSchema.optional(),
	assignedTask: TaskSchema.optional(),
});
export type TaskBidWithRelations = z.infer<typeof TaskBidWithRelationsSchema>;

export const ReviewWithRelationsSchema = ReviewSchema.extend({
	task: TaskSchema.optional(),
	author: UserSchema.optional(),
	target: UserSchema.optional(),
});
export type ReviewWithRelations = z.infer<typeof ReviewWithRelationsSchema>;

export const MessageWithRelationsSchema = MessageSchema.extend({
	task: TaskSchema.optional(),
	sender: UserSchema.optional(),
});
export type MessageWithRelations = z.infer<typeof MessageWithRelationsSchema>;

export const UserSkillWithRelationsSchema = UserSkillSchema.extend({
	user: UserSchema.optional(),
	skill: SkillSchema.optional(),
	customSkill: CustomSkillSchema.optional(),
});
export type UserSkillWithRelations = z.infer<
	typeof UserSkillWithRelationsSchema
>;

export const TaskSkillWithRelationsSchema = TaskSkillSchema.extend({
	task: TaskSchema.optional(),
	skill: SkillSchema.optional(),
	customSkill: CustomSkillSchema.optional(),
});
export type TaskSkillWithRelations = z.infer<
	typeof TaskSkillWithRelationsSchema
>;
