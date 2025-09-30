const fs = require('fs');
const path = require('path');
const { parse } = require('url');

module.exports = (req, res) => {
  const { pathname } = parse(req.url, true);
  
  // Set CORS headers for all requests
  res.setHeader('Cross-Origin-Embedder-Policy', 'cross-origin');
  res.setHeader('Cross-Origin-Opener-Policy', 'cross-origin');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Route mapping
  let filePath;
  if (pathname === '/' || pathname === '/index') {
    filePath = path.join(process.cwd(), 'index.html');
  } else if (pathname === '/lod') {
    filePath = path.join(process.cwd(), 'lod.html');
  } else if (pathname === '/thanos') {
    filePath = path.join(process.cwd(), 'thanos.html');
  } else if (pathname === '/forest') {
    filePath = path.join(process.cwd(), 'forest.html');
  } else {
    // Serve static files from root directory
    filePath = path.join(process.cwd(), pathname);
  }

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    res.status(404).json({ error: 'File not found' });
    return;
  }

  // Check if it's a directory
  const stat = fs.statSync(filePath);
  if (stat.isDirectory()) {
    // Try to serve index.html from directory
    const indexPath = path.join(filePath, 'index.html');
    if (fs.existsSync(indexPath)) {
      filePath = indexPath;
    } else {
      res.status(404).json({ error: 'Directory listing not allowed' });
      return;
    }
  }

  // Determine content type
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.ply': 'application/octet-stream',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject'
  };

  const contentType = mimeTypes[ext] || 'application/octet-stream';
  
  // Set caching headers for assets
  if (pathname.startsWith('/assets/')) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  }

  // Read and serve the file
  try {
    const fileContent = fs.readFileSync(filePath);
    res.setHeader('Content-Type', contentType);
    res.status(200).send(fileContent);
  } catch (error) {
    console.error('Error reading file:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
