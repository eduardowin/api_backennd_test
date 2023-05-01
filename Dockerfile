FROM node

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install

COPY . /usr/src/app

EXPOSE 3000

ARG KEY_JWT=aKLMSLK3I4JNESOLUTIONSKJN545N4J5N4J54H4G44H5JBSSDBAXAAXA
ENV KEY_JWT=aKLMSLK3I4JNESOLUTIONSKJN545N4J5N4J54H4G44H5JBSSDBAXAAXA

ARG USER_URL_BASE=http://www.mocky.io
ENV USER_URL_BASE=http://www.mocky.io
ARG POLICIES_URL_BASE=http://www.mocky.io
ENV POLICIES_URL_BASE=http://www.mocky.io


CMD [ "npm", "start" ]