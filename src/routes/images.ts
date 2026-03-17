import { Router, Request, Response } from 'express';
import {
  processImage,
  getThumbPath,
  getFullPath,
  imageExists,
} from '../utilities/imageProcessor';

const router = Router();

// GET /api/images?filename=fjord&width=200&height=200
router.get('/', async (req: Request, res: Response): Promise<void> => {
  const { filename, width, height } = req.query;

  if (!filename) {
    res.status(400).json({ error: 'Missing required parameter: filename' });
    return;
  }

  if (!width || !height) {
    res
      .status(400)
      .json({ error: 'Missing required parameters: width and height' });
    return;
  }

  const parsedWidth = parseInt(width as string, 10);
  const parsedHeight = parseInt(height as string, 10);

  if (isNaN(parsedWidth) || isNaN(parsedHeight)) {
    res.status(400).json({ error: 'Width and height must be valid numbers' });
    return;
  }

  if (parsedWidth <= 0 || parsedHeight <= 0) {
    res
      .status(400)
      .json({ error: 'Width and height must be positive numbers' });
    return;
  }

  const fullPath = getFullPath(filename as string);
  if (!imageExists(fullPath)) {
    res.status(404).json({ error: `Image '${filename}' not found` });
    return;
  }

  const options = {
    filename: filename as string,
    width: parsedWidth,
    height: parsedHeight,
  };

  const thumbPath = getThumbPath(options);

  try {
    // caching: serve the existing thumb if it exists
    if (imageExists(thumbPath)) {
      process.stdout.write(`[${new Date().toISOString()}] Cache hit - Serving existing thumb: ${filename}\n`);
      res.sendFile(thumbPath);
      return;
    }

    // processing & caching the new image
    const outputPath = await processImage(options);
    process.stdout.write(`[${new Date().toISOString()}] Processed new image: ${filename} at ${parsedWidth}x${parsedHeight}\n`);
    res.sendFile(outputPath);
  } catch (err) {
    res.status(500).json({ error: 'Failed to process image' });
  }
});

export default router;
