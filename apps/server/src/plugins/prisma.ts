import prisma from "@ajil-go/db";
import fp from "fastify-plugin";

export default fp(
	async (fastify) => {
		await prisma.$connect();
		fastify.decorate("prisma", prisma);
		fastify.addHook("onClose", async () => {
			await prisma.$disconnect();
		});
	},
	{
		name: "prisma-plugin",
	},
);
