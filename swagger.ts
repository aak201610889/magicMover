import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

// Define options for the swagger-jsdoc
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Magic Items API',
      version: '1.0.0',
      description: 'API documentation for the Magic Items app',
    },
    servers: [
      {
        url: 'http://localhost:5001', // URL where your API will be running
      },
    ],
  },
  // Path to the API docs (JSDoc comments will be in these files)
  apis: ['./src/routes/*.ts', './src/models/*.ts'], // Adjust according to your file structure
};

// Create swagger definition
const swaggerDocs = swaggerJSDoc(swaggerOptions);

export const setupSwagger = (app: Express): void => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
