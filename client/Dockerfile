FROM node:20-alpine

WORKDIR /app

# Install dependencies first for better layer caching
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

EXPOSE 5173

# Vite dev server, exposed on all interfaces so the host can reach it
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
