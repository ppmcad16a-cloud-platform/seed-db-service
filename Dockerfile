# ============================================================
# Seed DB job - container image
#
# Runs ONCE (as a Kubernetes Job / Jenkins stage), seeds the
# database, exits 0 on success and 1 on failure.
#
#   docker run --rm -e MONGO_URI=... \
#     -e SEED_ADMIN_EMAIL=... -e SEED_ADMIN_PASSWORD=... seed-db-service
#
# Security:
#   - runs as the unprivileged "node" user (not root)
#   - production dependencies only; npm/yarn removed
#   - admin credentials come from environment variables (a
#     Kubernetes Secret), never baked into the image
# ============================================================

FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force


FROM node:22-alpine AS runtime
ENV NODE_ENV=production

RUN rm -rf /usr/local/lib/node_modules/npm /usr/local/lib/node_modules/corepack \
           /usr/local/bin/npm /usr/local/bin/npx /usr/local/bin/corepack \
           /opt/yarn-* /usr/local/bin/yarn /usr/local/bin/yarnpkg

WORKDIR /app
COPY --from=deps --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node . .

USER node
CMD ["node", "index.js"]
