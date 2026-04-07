// Cấu hình Swagger (Tài liệu API)
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT;
export const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'MovieT API Documentation',
            version: '1.0.0',
            description: 'Document API the project',
        },
        servers: [
            {
                url: `http://localhost:4000/api`,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Input Access Token to access this API',
                },
            },
            schemas: {
                SuccessResponse: {
                    type: 'object',
                    properties: {
                        status: { type: 'string', example: 'success' },
                        statusCode: { type: 'integer', example: 200 },
                        message: { type: 'string', example: 'Operation successful' },
                        data: { type: 'object' },
                        dateTime: { type: 'string', format: 'date-time' }
                    }
                },
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        status: { type: 'string', example: 'error' },
                        statusCode: { type: 'integer', example: 400 },
                        message: { type: 'string', example: 'Error message description' },
                        data: { type: 'string', nullable: true, example: null },
                        dateTime: { type: 'string', format: 'date-time' }
                    }
                }
            }
        },
    },
    // Đường dẫn đến các file chứa comment @swagger
    apis: ['./src/routers/*.js'],
};
