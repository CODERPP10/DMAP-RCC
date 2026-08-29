# syntax=docker/dockerfile:1

# ---- build stage: install all deps, compile client + server bundle ----
FROM oven/bun:1.2.14 AS build
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

# ---- runtime stage: production deps only + built artifacts ----
FROM oven/bun:1.2.14-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=5000

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

COPY --from=build /app/dist ./dist

EXPOSE 5000
USER bun
CMD ["bun", "dist/index.js"]
