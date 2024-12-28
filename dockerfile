FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install --force

COPY . .

RUN npm run build

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]