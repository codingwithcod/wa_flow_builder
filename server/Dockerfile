FROM node:20-alpine

WORKDIR /app

# Install dependencies first for better layer caching
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

EXPOSE 5000

# Dev mode with hot-reload via tsx watch
CMD ["npm", "run", "dev"]
