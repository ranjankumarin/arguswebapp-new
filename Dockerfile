FROM node:22-alpine3.19 as argus-webapp

WORKDIR /app

COPY package*.json ./

RUN npm config set registry https://registry.npmmirror.com/ --global

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
