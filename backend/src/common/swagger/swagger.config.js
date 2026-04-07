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
                url: `http://localhost:${PORT}/api/v1`,
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
        },
    },
    // Đường dẫn đến các file chứa comment @swagger
    apis: ['./src/routers/*.js'],
};
