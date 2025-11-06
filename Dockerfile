FROM node:25-alpine3.22

WORKDIR /adameds-igd
LABEL application="admisi service"
ENV APPLICATION_PORT=8085
ENV APPLICATION_HOST=0.0.0.0
COPY . .
RUN npm install
CMD ["npm", "run", "start"]
