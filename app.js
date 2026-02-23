import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Server is running on port 3000 ✅');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;