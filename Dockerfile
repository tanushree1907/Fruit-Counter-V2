FROM openshift/node:18-minimal-ubi8

# Create app directory
WORKDIR /app

# Install only production dependencies (faster build)
COPY package*.json ./
RUN npm ci --only=production

# Copy source
COPY . .

# Default port (matches backend)
ENV PORT=4000
EXPOSE 4000

# Start the app (ES modules expected)
CMD ["node", "server.js"]