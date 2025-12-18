import prisma from "@ajil-go/db";
import { type BetterAuthOptions, betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

export const auth = betterAuth<BetterAuthOptions>({
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	trustedOrigins: [process.env.CORS_ORIGIN || ""],
	emailAndPassword: {
		enabled: true,
	},
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		},
	},
	user: {
		additionalFields: {
			bio: {
				type: "string",
				required: false,
				input: true,
			},
			phone: {
				type: "string",
				required: false,
				input: true,
			},
			address: {
				type: "string",
				required: false,
				input: true,
			},
			city: {
				type: "string",
				required: false,
				input: true,
			},
			latitude: {
				type: "number",
				required: false,
				input: true,
			},
			longitude: {
				type: "number",
				required: false,
				input: true,
			},
			avgRatingAsClient: {
				type: "number",
				required: false,
				defaultValue: 0,
				input: false,
			},
			avgRatingAsWorker: {
				type: "number",
				required: false,
				defaultValue: 0,
				input: false,
			},
			completedTasksAsWorker: {
				type: "number",
				required: false,
				defaultValue: 0,
				input: false,
			},
			completedTasksAsClient: {
				type: "number",
				required: false,
				defaultValue: 0,
				input: false,
			},
		},
	},
	advanced: {
		defaultCookieAttributes: {
			sameSite: "none",
			secure: true,
			httpOnly: true,
		},
	},
});
