import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import apiRouter from './appApis.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use('/api', apiRouter);

app.use(express.static(resolve('./public')));


app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, './PrimeNexus-app/index.html'));
});





app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});