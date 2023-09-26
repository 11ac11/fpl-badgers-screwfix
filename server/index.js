'use strict';

import express from 'express';
import cors from 'cors';
import { router } from './router.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, (err) => {
  if (err) console.log('Problem on index with app.listen');
  else console.log(`Server running at http://localhost:${PORT}`);
});
