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

// you dont need to use API to serve static files
// app.get('/', (req, res) => {
//   res.sendFile(resolve(__dirname, './PrimeNexus-app/index.html'));
// });



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});