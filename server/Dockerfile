# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy application files
COPY . .

ARG PORT
ARG CLIENT_URL
ARG SERVER_URL
ENV PORT=$PORT
ENV CLIENT_URL=$CLIENT_URL
ENV SERVER_URL=$SERVER_URL

# Expose the application port (replace it with the server_port you received)
EXPOSE 3126

# Command to run the application
CMD ["npm", "start"]
