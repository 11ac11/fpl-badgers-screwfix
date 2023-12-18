'use strict';

import express from 'express';
import cors from 'cors';
import { router } from './router.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(router);

async function logPublicIP() {
  try {
    const response = await fetch('https://ipinfo.io/json');

    if (response.ok) {
      const data = await response.json();
      console.log('Public IP Address:', data.ip);
    } else {
      console.error(`Error: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Example usage
logPublicIP();

console.log('working?')

app.listen(PORT, (err) => {
  if (err) console.log('Problem on index with app.listen');
  else console.log(`Server running at http://0.0.0.0:${PORT}`);
});
