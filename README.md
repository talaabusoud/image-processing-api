# Image Processing API
## Project Overview  
This project is an Image Processing API built with Node.js and TypeScript that can be used in two primary ways. 
First, it functions as a simple placeholder API that allows developers to quickly place images into a frontend by specifying dimensions through URL parameters, making it ideal for rapid prototyping and layout development. Second, it serves as a dynamic image resizing service that delivers properly scaled versions of stored images to the client, eliminating the need to manually create and upload multiple image sizes and helping reduce page load time and storage usage. 

## Setup
```bash
npm install
```

## Scripts
| Command | Description |
|---|---|
| `npm start` | Start production server (runs from `dist/`) |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm test` | Run all Jasmine tests |
| `npm run lint` | Run ESLint |
| `npm run format` | Run Prettier formatter |

## API Endpoint

### `GET /api/images`

Query Parameters:
- `filename` (string, required) — name of image in `assets/full/` (without extension)
- `width` (number, required) — desired width in pixels
- `height` (number, required) — desired height in pixels

**Example:**
```
http://localhost:3000/api/images?filename=BG2&width=300&height=200
```

First request: resizes image and caches it in `assets/thumb/`.  
Subsequent requests: serves the cached thumb directly.

## Project Structure
```
src/           - TypeScript source files
dist/          - Compiled JavaScript
assets/full/   - Original full-size images
assets/thumb/  - Cached resized thumbnails
tests/         - Jasmine test specs
```
