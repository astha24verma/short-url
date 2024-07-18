FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
LABEL Name="Short URL App"
LABEL Version="1.0"
CMD ["npm", "start"]