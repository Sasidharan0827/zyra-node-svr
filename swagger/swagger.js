// swagger.js
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Swagger config
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Zyra API",
      version: "1.0.0",
      description: "API documentation for Zyra backend",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
  },
  apis: ["./routes/**/*.js"], // Where your routes are documented
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
