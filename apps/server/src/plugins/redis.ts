import { Redis } from "@upstash/redis";
import fp from "fastify-plugin";

// Create Redis client if env vars are available
const redis =
	process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
		? new Redis({
				url: process.env.UPSTASH_REDIS_REST_URL,
				token: process.env.UPSTASH_REDIS_REST_TOKEN,
			})
		: null;

// Cache helper with TTL support
export interface CacheOptions {
	/** Time to live in seconds */
	ttl?: number;
	/** Key prefix for namespacing */
	prefix?: string;
}

export interface CacheHelper {
	redis: Redis | null;
	/**
	 * Get a cached value or compute and cache it
	 * @param key Cache key
	 * @param fn Function to compute value if not cached
	 * @param options Cache options (ttl in seconds)
	 */
	getOrSet: <T>(
		key: string,
		fn: () => Promise<T>,
		options?: CacheOptions,
	) => Promise<T>;
	/**
	 * Invalidate cache keys by pattern
	 * @param pattern Key pattern (supports * wildcard)
	 */
	invalidate: (pattern: string) => Promise<void>;
	/**
	 * Set a value in cache
	 */
	set: <T>(key: string, value: T, options?: CacheOptions) => Promise<void>;
	/**
	 * Get a value from cache
	 */
	get: <T>(key: string) => Promise<T | null>;
	/**
	 * Delete a key from cache
	 */
	del: (key: string) => Promise<void>;
}

const DEFAULT_TTL = 300; // 5 minutes

function createCacheHelper(redisClient: Redis | null): CacheHelper {
	return {
		redis: redisClient,

		async getOrSet<T>(
			key: string,
			fn: () => Promise<T>,
			options?: CacheOptions,
		): Promise<T> {
			const cacheKey = options?.prefix ? `${options.prefix}:${key}` : key;

			if (!redisClient) {
				// No Redis, just compute the value
				return fn();
			}

			try {
				// Try to get from cache
				const cached = await redisClient.get<T>(cacheKey);
				if (cached !== null) {
					return cached;
				}

				// Compute and cache
				const value = await fn();
				const ttl = options?.ttl ?? DEFAULT_TTL;

				await redisClient.set(cacheKey, value, { ex: ttl });

				return value;
			} catch (error) {
				console.error("Cache error, falling back to computation:", error);
				return fn();
			}
		},

		async invalidate(pattern: string): Promise<void> {
			if (!redisClient) return;

			try {
				// Scan for keys matching pattern and delete them
				let cursor = 0;
				do {
					const result = await redisClient.scan(cursor, {
						match: pattern,
						count: 100,
					});
					cursor = Number(result[0]);
					const keys = result[1];

					if (keys.length > 0) {
						await redisClient.del(...keys);
					}
				} while (cursor !== 0);
			} catch (error) {
				console.error("Cache invalidation error:", error);
			}
		},

		async set<T>(key: string, value: T, options?: CacheOptions): Promise<void> {
			if (!redisClient) return;

			const cacheKey = options?.prefix ? `${options.prefix}:${key}` : key;
			const ttl = options?.ttl ?? DEFAULT_TTL;

			try {
				await redisClient.set(cacheKey, value, { ex: ttl });
			} catch (error) {
				console.error("Cache set error:", error);
			}
		},

		async get<T>(key: string): Promise<T | null> {
			if (!redisClient) return null;

			try {
				return await redisClient.get<T>(key);
			} catch (error) {
				console.error("Cache get error:", error);
				return null;
			}
		},

		async del(key: string): Promise<void> {
			if (!redisClient) return;

			try {
				await redisClient.del(key);
			} catch (error) {
				console.error("Cache delete error:", error);
			}
		},
	};
}

export default fp(
	async (fastify) => {
		const cache = createCacheHelper(redis);

		fastify.decorate("redis", redis);
		fastify.decorate("cache", cache);

		if (redis) {
			fastify.log.info("Upstash Redis cache initialized");
		} else {
			fastify.log.warn(
				"Redis not configured - caching disabled (set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN)",
			);
		}
	},
	{
		name: "redis-plugin",
	},
);
