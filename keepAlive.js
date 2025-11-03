// keepAlive.js
import https from 'https';

// Only start keepAlive after server is ready (not during build/deployment)
// This will be called from app.js after server starts listening
export function startKeepAlive() {
  // Function to make an HTTPS request to your own server
  function pingServer() {
    const url = process.env.KEEPALIVE_URL || 'https://fortunebloodtest.com';
    const req = https.get(url, { timeout: 10000 }, (res) => {
      console.log(`[${new Date().toISOString()}] Server pinged with response status code:`, res.statusCode);
      res.on('data', () => {}); // Consume response data
      res.on('end', () => {});
    });
    
    req.on('error', (e) => {
      console.error(`[${new Date().toISOString()}] Error pinging server:`, e.message);
    });
    
    req.on('timeout', () => {
      req.destroy();
      console.error(`[${new Date().toISOString()}] Ping request timed out`);
    });
    
    req.setTimeout(10000); // 10 second timeout
  }

  // Initial ping after 30 seconds (give server time to fully start)
  setTimeout(pingServer, 30000);
  
  // Set an interval to run the pingServer function every 15 minutes (900000ms)
  setInterval(pingServer, 900000);
  console.log('✅ KeepAlive started - will ping every 15 minutes to prevent Render spin-down');
}