# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory
WORKDIR /server

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the backend port
EXPOSE 5000

# Start the server
CMD ["npm", "start"]