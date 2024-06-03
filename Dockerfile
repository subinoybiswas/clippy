# base image-node package called
FROM node:18-alpine

# working directory set
WORKDIR /app 

# copy package.json
COPY package*.json ./

# install dependencies
RUN npm install
RUN npm install next react react-dom eslint tailwindcss typescript vite postcss autoprefixer

# copy other files
COPY . .

# copy .env
COPY .env ./

# port exposed where the app will work 
EXPOSE 3000

# to run the image
CMD ["npm", "run", "dev"]
