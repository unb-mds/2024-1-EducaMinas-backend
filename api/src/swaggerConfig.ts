import { SwaggerDefinition } from 'swagger-jsdoc';

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'EducaMinas API',
    version: '1.0.0',
    description: 'Documentação da API para consulta de dados que alimentam os gráficos',
  },
  servers: [
    {
      url: 'https://2024-1-educa-minas-backend.vercel.app',
      description: 'Ambiente de produção',
    },
  ],
};

export const options = {
  swaggerDefinition,
  apis: ['./api/src/routes/*.ts'],
};
