ARG IMAGE_TYPE=prod

# Install dependencies only when needed
FROM node:20-bullseye-slim AS bdeps

# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
ENV NEXT_TELEMETRY_DISABLED=1
ENV APP_HOME=/app
ARG NEXT_PUBLIC_DIRECTUS_URL=
ENV NEXT_PUBLIC_DIRECTUS_URL=$NEXT_PUBLIC_DIRECTUS_URL

WORKDIR $APP_HOME

COPY pnpm-lock.yaml package.json ./

RUN corepack enable && pnpm config set store-dir $APP_HOME/.pnpm-store

RUN pnpm fetch

COPY . .

# We do not really need to build here (as the builder does not need the build)
# But it is simpler because it allows us to only pick the compiled files in the
# base image
RUN pnpm install --frozen-lockfile && pnpm build && pnpm prune --prod

# Production image, copy all the files and run next
FROM node:20-bullseye-slim AS base

RUN apt-get update && apt-get install -y ca-certificates

ENV APP_HOME=/app
ENV APP_USER=nodejs
ENV USER_ID=2001
ENV GROUP_ID=2001

WORKDIR $APP_HOME

# We need to specify uid & gid in order to grant access to the volumes
# from the host
RUN groupadd -r -g $GROUP_ID $APP_USER && \
    useradd -r -u $USER_ID -g $APP_USER -d $APP_HOME -s /sbin/nologin -c "Docker image user" $APP_USER

VOLUME /mnt/settings/

COPY --from=bdeps --chown=$GROUP_ID:$USER_ID $APP_HOME/next.config.ts ./
COPY --from=bdeps --chown=$GROUP_ID:$USER_ID $APP_HOME/env.ts ./
COPY --from=bdeps --chown=$GROUP_ID:$USER_ID $APP_HOME/public ./public
COPY --from=bdeps --chown=nextjs:nodejs $APP_HOME/.next ./.next
COPY --from=bdeps --chown=$GROUP_ID:$USER_ID $APP_HOME/package.json ./package.json

RUN corepack enable && pnpm config set store-dir $APP_HOME/.pnpm-store

# This is needed by next start
COPY --from=bdeps $APP_HOME/node_modules ./node_modules
RUN mkdir -p .node && chown $GROUP_ID:$USER_ID .node/
RUN mkdir -p .cache && chown $GROUP_ID:$USER_ID .cache/

EXPOSE 3000

# We copy files here so that they belong to root

FROM base AS version-prod
RUN echo "This is the production build, removing unneeded packages."

RUN apt remove -y curl && apt autoremove -y
USER $APP_USER

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["pnpm", "start"]

FROM version-${IMAGE_TYPE} AS final
RUN echo "Final version is version-${IMAGE_TYPE}"
