FROM node:slim

RUN npm install --quiet --global \
      vue-cli

ENV NODE_ENV development
ENV HOST 0.0.0.0
ENV APP_HOME /app

RUN mkdir -p $APP_HOME

WORKDIR $APP_HOME

COPY package.json $APP_HOME

#RUN npm install --no-cache
COPY . $APP_HOME

RUN /bin/sh -c "mkdir ~/tmp;cp /app/package.json ~/tmp/ ;cd ~/tmp ;npm install --no-cache --no-optional; cp -R /app/. ~/tmp/ ;"
EXPOSE 8080
