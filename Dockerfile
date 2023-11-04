FROM node:18.16.1
WORKDIR /nhlcoding-backend
COPY . .
RUN npm install
# CMD [ "node", "src/index.js" ]
CMD [ "npm", "start" ]
# CMD [ "nodemon", "--inspect", "src/index.js" ]