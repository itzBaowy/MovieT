import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { swaggerOptions } from '@moviet/shared/swagger/swagger.config.js';
import { appErorr } from '@moviet/shared/helpers/handle-error.helper.js';
import { NotFoundException } from '@moviet/shared/helpers/exception.helper.js';
import rootRouter from './routers/root.router.js';

const app = express();
const PORT = process.env.PORT || 8082;
const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.set('trust proxy', true);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(cors());
app.use(express.json());

app.use('/api', rootRouter);

app.use((req, res, next) => {
    if (req.originalUrl === '/favicon.ico') return res.status(404).end();
    throw new NotFoundException();
});

app.use(appErorr);

const httpServer = createServer(app);
httpServer.listen(PORT, () => {
    console.log('-----------------------------------------');
    console.log(`💳 Payment Service is running at http://localhost:${PORT}`);
    console.log(`📄 Swagger Docs at http://localhost:${PORT}/api-docs`);
    console.log('-----------------------------------------');
});
