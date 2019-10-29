FROM node:alpine

ADD ./docker_dev/app/ /siep-gw/
WORKDIR /siep-gw/
RUN npm install

RUN wget https://api.github.com/repos/decyt-tdf/siep-api-gateway/commits/master && mv master master.json
RUN wget https://api.github.com/repos/decyt-tdf/siep-api-gateway/commits/developer && mv developer developer.json

CMD ["npm","start"]
