import supertest from 'supertest';
import app from '../src/index';

const request = supertest(app);

describe('GET /api/images', () => {
  it('should return 400 if filename is missing', async () => {
    const res = await request.get('/api/images?width=200&height=200');
    expect(res.status).toBe(400);
  });

  it('should return 400 if width is missing', async () => {
    const res = await request.get('/api/images?filename=BG2&height=200');
    expect(res.status).toBe(400);
  });

  it('should return 400 if width is not a number', async () => {
    const res = await request.get(
      '/api/images?filename=BG2&width=abc&height=200'
    );
    expect(res.status).toBe(400);
  });

  it('should return 400 if width is zero', async () => {
    const res = await request.get(
      '/api/images?filename=BG2&width=0&height=200'
    );
    expect(res.status).toBe(400);
  });

  it('should return 404 if image does not exist', async () => {
    const res = await request.get(
      '/api/images?filename=nonexistent&width=200&height=200'
    );
    expect(res.status).toBe(404);
  });

  it('should return 200 and an image for valid parameters', async () => {
    //real image named "BG2.jpg" in assets/full/
    const res = await request.get(
      '/api/images?filename=BG2&width=200&height=200'
    );
    expect(res.status).toBe(200);
  });
});
