import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';

require('dotenv').config();
import router from './router';

const app = express();

app.use(cors({
  credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

const port = 8080;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const MONGO_URL = process.env.DATABASE_URL

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

mongoose.connection.on('error', (error: Error) => console.log(error));
app.use('/', router());