import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const port = 3001; // Port for the proxy server

// Proxy configuration
const proxyOptions = {
  target: 'http://mmtf.rcsb.org',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // Remove the '/api' prefix from the request URL
  },
  onProxyRes: (proxyRes, req, res) => {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
  },
};

// Create the proxy middleware
const proxy = createProxyMiddleware('/api', proxyOptions);

// Use the proxy middleware
app.use(proxy);

// Start the server
app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
