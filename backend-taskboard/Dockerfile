FROM node:latest

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["./migrate-and-start.sh"]