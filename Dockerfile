
FROM node:20


WORKDIR /app


COPY package*.json ./


RUN npm install

# Copy the rest of the application code
COPY . .

COPY ./.env ./


# Expose the port the app runs on
EXPOSE 5001


# Run the application
CMD ["npm", "run", "start"]
