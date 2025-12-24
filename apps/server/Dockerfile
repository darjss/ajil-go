# Multi-stage Dockerfile for Fastify API Server
# Stage 1: Base image with pnpm
FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@10.18.3 --activate
WORKDIR /app

# Stage 2: Install all dependencies
FROM base AS deps
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages/db/package.json packages/db/
COPY packages/auth/package.json packages/auth/
COPY packages/contract/package.json packages/contract/
COPY packages/config/package.json packages/config/
COPY apps/server/package.json apps/server/
RUN pnpm install --frozen-lockfile

# Stage 3: Build the application
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages/db/node_modules ./packages/db/node_modules
COPY --from=deps /app/packages/auth/node_modules ./packages/auth/node_modules
COPY --from=deps /app/packages/contract/node_modules ./packages/contract/node_modules
COPY --from=deps /app/apps/server/node_modules ./apps/server/node_modules
COPY . .

# Generate Prisma client
RUN pnpm --filter @ajil-go/db exec prisma generate

# Build the server (tsdown bundles all dependencies)
RUN pnpm --filter server build

# Stage 4: Production runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 fastify

# Copy built application (single bundled file)
COPY --from=builder /app/apps/server/dist ./dist
COPY --from=builder /app/apps/server/package.json ./

# Copy Prisma generated client (required at runtime)
COPY --from=builder /app/packages/db/prisma/generated ./node_modules/.prisma/client
COPY --from=builder /app/node_modules/.pnpm/@prisma+client@*/node_modules/@prisma/client ./node_modules/@prisma/client

# Set ownership
RUN chown -R fastify:nodejs /app

USER fastify

EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3001/ || exit 1

CMD ["node", "dist/index.mjs"]
