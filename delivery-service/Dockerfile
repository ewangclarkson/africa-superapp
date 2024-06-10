ARG NODE_VERSION=21.1.0

FROM node:${NODE_VERSION}-alpine


WORKDIR /usr/src/app

COPY . /usr/src/app


RUN npm install

# Expose the port that the application listens on.
EXPOSE 8002

# Run the application.
CMD npm start
