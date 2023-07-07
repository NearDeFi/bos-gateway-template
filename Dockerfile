# Use an official Node runtime as a parent image
FROM node:18-alpine

# Install dependencies
RUN apk add --update git python3 make g++
RUN apk add --no-cache curl \
    && curl -sL https://unpkg.com/@pnpm/self-installer | node

# Set the working directory in the container to /app
WORKDIR /app

# Clone the repository
RUN git clone https://github.com/NearDeFi/polygon-bos-gateway.git .

# copy .env.example to .env
RUN cp .env.example .env

# Install any needed packages
RUN pnpm install

# Build the app
RUN pnpm run build

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define environment variable
ENV NODE_ENV production

# Run the app when the container launches
CMD ["pnpm", "start"]
