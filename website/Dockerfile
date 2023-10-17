FROM node:20-slim AS builder
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /work

COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run compile

FROM node:20-slim as runner

WORKDIR /work
COPY --from=builder /work/package.json .
COPY --from=builder /work/next.config.js ./
COPY --from=builder /work/public ./public
COPY --from=builder /work/.next/standalone ./
COPY --from=builder /work/.next/static ./.next/static
COPY --from=builder /work/.env ./

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]