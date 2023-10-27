# Use the official Node.js image as the base image
FROM node:16.14.2

# Set the working directory to /app
WORKDIR /app

RUN npm install -g @angular/cli@13

# Copy the package.json and package-lock.json files to the container
COPY package*.json angular.json tsconfig*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Start the Angular development server
CMD ["ng", "serve", "--host", "0.0.0.0"]