FROM node:20.8-alpine

WORKDIR /frontend

EXPOSE 3000

COPY package.json .

COPY package-lock.json .

RUN npm install

ENV NODE_ENV=production

COPY . .

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s", "build"]
