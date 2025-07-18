FROM node:19.5.0-alpine

WORKDIR /adameds-igd
LABEL application="admisi service"
ENV APPLICATION_PORT=8084
ENV APPLICATION_HOST=0.0.0.0
COPY . .
RUN npm install
RUN npm install -g @infisical/cli
CMD ["sh", "-c", "infisical run --env=development -- npm run start"]
