import type { FastifyInstance } from "fastify";

interface BenchmarkResult {
	operation: string;
	durationMs: number;
	success: boolean;
	error?: string;
}

interface BenchmarkResponse {
	timestamp: string;
	results: BenchmarkResult[];
	summary: {
		totalDurationMs: number;
		database: {
			pingMs: number | null;
			simpleQueryMs: number | null;
			complexQueryMs: number | null;
		};
		redis: {
			available: boolean;
			setMs: number | null;
			getMs: number | null;
			deleteMs: number | null;
		};
	};
}

async function measureAsync<T>(
	fn: () => Promise<T>,
): Promise<{ result: T | null; durationMs: number; error?: string }> {
	const start = performance.now();
	try {
		const result = await fn();
		return { result, durationMs: performance.now() - start };
	} catch (err) {
		return {
			result: null,
			durationMs: performance.now() - start,
			error: err instanceof Error ? err.message : String(err),
		};
	}
}

export default async function benchmarkRoutes(fastify: FastifyInstance) {
	fastify.get("/", async () => {
		const results: BenchmarkResult[] = [];
		const startTime = performance.now();

		// Database benchmarks
		// 1. Simple ping query
		const dbPing = await measureAsync(
			() => fastify.prisma.$queryRaw`SELECT 1 as ping`,
		);
		results.push({
			operation: "db:ping",
			durationMs: dbPing.durationMs,
			success: !dbPing.error,
			error: dbPing.error,
		});

		// 2. Simple count query
		const dbSimpleQuery = await measureAsync(() => fastify.prisma.user.count());
		results.push({
			operation: "db:count_users",
			durationMs: dbSimpleQuery.durationMs,
			success: !dbSimpleQuery.error,
			error: dbSimpleQuery.error,
		});

		// 3. Complex query with joins
		const dbComplexQuery = await measureAsync(() =>
			fastify.prisma.task.findMany({
				take: 10,
				include: {
					poster: {
						select: { id: true, name: true },
					},
					category: true,
					_count: {
						select: { bids: true },
					},
				},
				orderBy: { createdAt: "desc" },
			}),
		);
		results.push({
			operation: "db:complex_query",
			durationMs: dbComplexQuery.durationMs,
			success: !dbComplexQuery.error,
			error: dbComplexQuery.error,
		});

		// Redis benchmarks
		const testKey = `benchmark:test:${Date.now()}`;
		const testValue = {
			test: true,
			timestamp: Date.now(),
			data: "x".repeat(100),
		};

		let redisAvailable = false;
		let redisSetMs: number | null = null;
		let redisGetMs: number | null = null;
		let redisDeleteMs: number | null = null;

		if (fastify.redis) {
			redisAvailable = true;

			// 1. Redis SET
			const redisSet = await measureAsync(() =>
				fastify.redis!.set(testKey, testValue, { ex: 60 }),
			);
			redisSetMs = redisSet.durationMs;
			results.push({
				operation: "redis:set",
				durationMs: redisSet.durationMs,
				success: !redisSet.error,
				error: redisSet.error,
			});

			// 2. Redis GET
			const redisGet = await measureAsync(() => fastify.redis!.get(testKey));
			redisGetMs = redisGet.durationMs;
			results.push({
				operation: "redis:get",
				durationMs: redisGet.durationMs,
				success: !redisGet.error,
				error: redisGet.error,
			});

			// 3. Redis DELETE
			const redisDel = await measureAsync(() => fastify.redis!.del(testKey));
			redisDeleteMs = redisDel.durationMs;
			results.push({
				operation: "redis:delete",
				durationMs: redisDel.durationMs,
				success: !redisDel.error,
				error: redisDel.error,
			});
		} else {
			results.push({
				operation: "redis:not_configured",
				durationMs: 0,
				success: false,
				error:
					"Redis not configured (UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN not set)",
			});
		}

		// Cache helper benchmarks (tests the cache.getOrSet pattern)
		if (fastify.redis) {
			const cacheKey = `benchmark:cache:${Date.now()}`;

			// First call - should compute and cache
			const cacheMiss = await measureAsync(() =>
				fastify.cache.getOrSet(
					cacheKey,
					async () => {
						// Simulate some computation
						await new Promise((r) => setTimeout(r, 10));
						return { cached: true, timestamp: Date.now() };
					},
					{ ttl: 60 },
				),
			);
			results.push({
				operation: "cache:miss_and_set",
				durationMs: cacheMiss.durationMs,
				success: !cacheMiss.error,
				error: cacheMiss.error,
			});

			// Second call - should hit cache
			const cacheHit = await measureAsync(() =>
				fastify.cache.getOrSet(
					cacheKey,
					async () => {
						// This shouldn't be called on cache hit
						await new Promise((r) => setTimeout(r, 100));
						return { cached: false, timestamp: Date.now() };
					},
					{ ttl: 60 },
				),
			);
			results.push({
				operation: "cache:hit",
				durationMs: cacheHit.durationMs,
				success: !cacheHit.error,
				error: cacheHit.error,
			});

			// Cleanup
			await fastify.cache.del(cacheKey);
		}

		const totalDurationMs = performance.now() - startTime;

		const response: BenchmarkResponse = {
			timestamp: new Date().toISOString(),
			results,
			summary: {
				totalDurationMs,
				database: {
					pingMs: dbPing.error ? null : dbPing.durationMs,
					simpleQueryMs: dbSimpleQuery.error ? null : dbSimpleQuery.durationMs,
					complexQueryMs: dbComplexQuery.error
						? null
						: dbComplexQuery.durationMs,
				},
				redis: {
					available: redisAvailable,
					setMs: redisSetMs,
					getMs: redisGetMs,
					deleteMs: redisDeleteMs,
				},
			},
		};

		return response;
	});
}
