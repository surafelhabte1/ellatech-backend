# Use Node.js LTS
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build NestJS
RUN npm run build

# Expose port
EXPOSE 3000

# Start the app
CMD ["node", "dist/main.js"]
