# ---- Build Stage ----
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies first (better caching)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the project (Next.js / React / Vite)
RUN npm run build

# ---- Production Stage ----
FROM node:20-alpine

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/package.json .
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Expose port (change if your app uses a different port)
EXPOSE 3000

# Switch to non-root user
USER appuser

# Start the app
CMD ["npm", "start"]
