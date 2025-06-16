FROM node:20-alpine

WORKDIR /app

COPY . .

RUN yarn install --network-timeout 100000 --verbose

RUN npx prisma generate

RUN yarn build

EXPOSE 3000

CMD ["node", "dist/src/main"]
