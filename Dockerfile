FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --network-timeout 100000 --verbose

COPY . .

RUN npx prisma generate

RUN yarn build

EXPOSE 3000

CMD ["node", "dist/main"]

