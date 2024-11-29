import swaggerJsdoc, { Options } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'VGC API',
      description: 'API endpoints for VGC services documented on Swagger',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:8000/',
        description: 'Local server',
      },
      {
        url: '<your live url here>',
        description: 'Live server',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], 
};

const swaggerSpec = swaggerJsdoc(options);

export default function swaggerDocs(app: Express): void {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
