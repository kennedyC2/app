FROM node:latest

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

RUN mkdir /usr/src/app/.data

RUN mkdir /usr/src/app/.data/images

EXPOSE 4000

CMD [ "npm", "start" ]
