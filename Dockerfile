# Use Node.js 22 Alpine image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Generate Prisma client (already done in postinstall)
# RUN yarn prisma:generate

# Build the application
RUN yarn build

# Expose port
EXPOSE 3000

# Start the application
CMD ["yarn", "start:prod"]
