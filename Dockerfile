FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

ENV PORT=4000

EXPOSE 4000

CMD ["node", "dist/main"]
