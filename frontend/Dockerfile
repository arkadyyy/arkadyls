
FROM node:14.18.1



WORKDIR /frontend

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]