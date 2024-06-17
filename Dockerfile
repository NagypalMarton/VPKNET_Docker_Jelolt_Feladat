FROM node:20.14
WORKDIR /app
COPY . .
RUN npm install --production
#RUN npm install --save-dev nodemon
#CMD [ "npx nodemon" ]
CMD [ "node", "app.js" ]
EXPOSE 3000