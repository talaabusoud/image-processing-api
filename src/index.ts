import express, { Application, Request, Response } from 'express';
import imagesRouter from './routes/images';

const app: Application = express();
const PORT = 3000;

app.use(express.json());

// routes
app.use('/api/images', imagesRouter);

// health checking route
app.get('/', (req: Request, res: Response): void => {
  res.send('Image Processing API is running!');
});

// start the server only when not in test
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    process.stdout.write(`Server running at http://localhost:${PORT}\n`);
  });
}

export default app;
