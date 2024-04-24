FROM node:20.8-alpine

WORKDIR /backend

EXPOSE 3001

COPY package.json .

COPY package-lock.json .

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]