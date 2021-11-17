FROM node:14.18.1


ENV NODE_ENV=production

WORKDIR /backend

COPY package*.json ./

RUN npm install

COPY . .
EXPOSE 9999

CMD ["node", "backend.js" ]

