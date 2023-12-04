FROM node:18.16.1

WORKDIR /abc/src/app
COPY package*.json ./
RUN npm install

COPY . .

# Set environment variables
ARG ENV_VARIABLE
ENV CONNECTION_STRING $ENV_VARIABLE


EXPOSE 80
CMD ["npm", "start"]