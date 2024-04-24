import express, { Request, Response } from 'express';
const cors = require('cors')
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/user', require('./routes/LoginRoutes'));
app.use('/posts', require('./routes/PostsRoutes'));
app.use('/calc', require('./routes/CalcRoutes'));
app.use('/favourite', require('./routes/FavouriteRoutes'));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});