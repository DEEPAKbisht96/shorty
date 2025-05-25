# ===============================
# Stage 1: Build dependencies
# ===============================
FROM node:22-alpine AS deps

WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# ===============================
# Stage 2: Copy source and run
# ===============================
FROM node:22-alpine

# Set environment
ENV NODE_ENV=production

WORKDIR /app

# Copy only necessary files from previous stage
COPY --from=deps /app/node_modules ./node_modules

# Copy application code
COPY . .

# Expose production port
EXPOSE 8000

# Run the application
CMD ["npm", "start"]