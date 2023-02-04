FROM --platform=linux/amd64 node:16
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8888
ENTRYPOINT ["node", "BookServer.js"]
