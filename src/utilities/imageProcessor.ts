import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const fullDir = path.join(process.cwd(), 'assets/full');
const thumbDir = path.join(process.cwd(), 'assets/thumb');

export interface ProcessImageOptions {
  filename: string;
  width: number;
  height: number;
}

export const getThumbPath = (options: ProcessImageOptions): string => {
  return path.join(
    thumbDir,
    `${options.filename}_${options.width}x${options.height}.jpg`
  );
};

export const getFullPath = (filename: string): string => {
  return path.join(fullDir, `${filename}.jpg`);
};

export const imageExists = (filePath: string): boolean => {
  return fs.existsSync(filePath);
};

export const processImage = async (
  options: ProcessImageOptions
): Promise<string> => {
  const { filename, width, height } = options;

  const inputPath = getFullPath(filename);
  const outputPath = getThumbPath(options);

  if (!imageExists(inputPath)) {
    throw new Error(`Image '${filename}' not found in full directory.`);
  }

  // ensuring thumb directory exists
  if (!fs.existsSync(thumbDir)) {
    fs.mkdirSync(thumbDir, { recursive: true });
  }

  await sharp(inputPath).resize(width, height).jpeg().toFile(outputPath);

  return outputPath;
};
