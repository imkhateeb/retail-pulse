# Use Node.js with Alpine
FROM node:18-alpine

# Install necessary dependencies for sharp
RUN apk add --no-cache bash make g++ gcc python3 libc6-compat

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./

# Install dependencies with sharp support
RUN npm install

# Copy application code
COPY . .

# Copy the wait-for-it.sh script
COPY wait-for-it.sh /usr/src/app/wait-for-it.sh

# Make the script executable
RUN chmod +x /usr/src/app/wait-for-it.sh

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
