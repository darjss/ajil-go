import type { FastifyInstance } from "fastify";
import type {
	GetPaymentsQuery,
	IdParams,
	CreatePaymentBody,
	UpdatePaymentBody,
} from "@ajil-go/contract";

export async function getPayments(
	fastify: FastifyInstance,
	query: GetPaymentsQuery,
) {
	const { page, limit, taskId, payerId, payeeId, status } = query;
	const skip = (page - 1) * limit;

	const where = {
		...(taskId && { taskId }),
		...(payerId && { payerId }),
		...(payeeId && { payeeId }),
		...(status && { status }),
	};

	const [payments, total] = await Promise.all([
		fastify.prisma.payment.findMany({
			where,
			skip,
			take: limit,
			include: {
				task: {
					select: { id: true, title: true, status: true },
				},
			},
			orderBy: { createdAt: "desc" },
		}),
		fastify.prisma.payment.count({ where }),
	]);

	return {
		data: payments,
		meta: {
			total,
			page,
			limit,
			totalPages: Math.ceil(total / limit),
		},
	};
}

export async function getPaymentById(
	fastify: FastifyInstance,
	params: IdParams,
) {
	const payment = await fastify.prisma.payment.findUnique({
		where: { id: params.id },
		include: {
			task: {
				select: {
					id: true,
					title: true,
					status: true,
					poster: {
						select: { id: true, name: true },
					},
					assignedBid: {
						select: {
							bidder: {
								select: { id: true, name: true },
							},
						},
					},
				},
			},
		},
	});

	return payment;
}

export async function createPayment(
	fastify: FastifyInstance,
	body: CreatePaymentBody,
) {
	const payment = await fastify.prisma.payment.create({
		data: body,
		include: {
			task: {
				select: { id: true, title: true },
			},
		},
	});

	return payment;
}

export async function updatePayment(
	fastify: FastifyInstance,
	params: IdParams,
	body: UpdatePaymentBody,
) {
	const payment = await fastify.prisma.payment.update({
		where: { id: params.id },
		data: body,
	});

	return payment;
}

export async function deletePayment(
	fastify: FastifyInstance,
	params: IdParams,
) {
	await fastify.prisma.payment.delete({
		where: { id: params.id },
	});
}
