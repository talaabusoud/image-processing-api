import {
  processImage,
  imageExists,
  getFullPath,
  getThumbPath,
} from '../../src/utilities/imageProcessor';
import fs from 'fs';

describe('imageProcessor utility', () => {
  const testOptions = { filename: 'BG2', width: 100, height: 100 };

  it('should return false for imageExists on non existent file', () => {
    expect(imageExists('/fake/path/nope.jpg')).toBeFalse();
  });

  it('should construct correct full image path', () => {
    const p = getFullPath('BG2');
    expect(p).toContain('BG2.jpg');
  });

  it('should construct correct thumb path with dimensions', () => {
    const p = getThumbPath(testOptions);
    expect(p).toContain('BG2_100x100.jpg');
  });

  it('should process an image and save a thumb (requires BG2.jpg in assets/full)', async () => {
    const outputPath = await processImage(testOptions);
    expect(fs.existsSync(outputPath)).toBeTrue();
  });

  it('should throw an error for a non existent image', async () => {
    await expectAsync(
      processImage({ filename: 'doesnotexist', width: 100, height: 100 })
    ).toBeRejected();
  });
});
