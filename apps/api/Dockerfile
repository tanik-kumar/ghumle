FROM node:22-alpine AS base
WORKDIR /app

COPY package.json turbo.json tsconfig.base.json ./
COPY apps/api/package.json apps/api/package.json
COPY packages/contracts/package.json packages/contracts/package.json
COPY packages/design-tokens/package.json packages/design-tokens/package.json
COPY packages/ui/package.json packages/ui/package.json

RUN npm install

COPY . .
RUN npm run build --workspace @ghumle/contracts
RUN npm run build --workspace @ghumle/design-tokens
RUN npm run build --workspace @ghumle/ui
RUN npm run db:generate --workspace @ghumle/api
RUN npm run build --workspace @ghumle/api

EXPOSE 4000
CMD ["npm", "run", "start", "--workspace", "@ghumle/api"]
