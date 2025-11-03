// keepAlive.js
import https from 'https';

// Only start keepAlive after server is ready (not during build/deployment)
// This will be called from app.js after server starts listening
export function startKeepAlive() {
  // Function to make an HTTPS request to your own server
  function pingServer() {
    const url = process.env.KEEPALIVE_URL || 'https://fortunebloodtest.com';
    https.get(url, (res) => {
      console.log('Server pinged with response status code:', res.statusCode);
    }).on('error', (e) => {
      console.error('Error pinging server:', e.message);
    });
  }

  // Set an interval to run the pingServer function every 15 minutes
  setInterval(pingServer, 900000);
  console.log('✅ KeepAlive started');
}