FROM node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY public public
COPY index.js index.js

EXPOSE 8181
EXPOSE 80

CMD [ "npm", "start" ]
