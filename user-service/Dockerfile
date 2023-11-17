### Stage 1: Development Stage ###
FROM node:16-alpine as development

# Set the working directory to /user-service
WORKDIR /user-service

# Copy package.json and package-lock.json to the working directory
COPY package*.json .

COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript code
RUN npm run build

### Stage 2: Production Stage ###
FROM node:16-alpine as production

# Set environment to production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Set the working directory to /user-service
WORKDIR /user-service

# Copy package.json and package-lock.json to the working directory
COPY package*.json .

# Install only development packages
RUN npm install --only=production

# Copy the built app from the development stage to the production stage
COPY --from=development /user-service/dist ./dist
COPY --from=development /user-service/prisma ./prisma

# Set the command to run the app
CMD ["node", "dist/server.js"]
