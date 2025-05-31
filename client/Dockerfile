# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy application files
COPY . .

# Set environment variables
ARG VITE_API_URL
ARG VITE_CLIENT_URL
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_CLIENT_URL=$VITE_CLIENT_URL

# build the application
RUN npm run build

# Use Nginx as web server
FROM nginx:alpine

# Copy Nginx custom configuration file 
COPY client_nginx.conf /etc/nginx/conf.d/default.conf

# Copy built app to Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the application port (replace this port with client_port you received)
EXPOSE 3125

# Command to run the application
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3125"]
