import express from 'express';
import cors from 'cors'; 
import dotenv from 'dotenv';
import userRoutes from './routes/useRoutes.js';
import inviteRoutes from './routes/inviteRoutes.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api', userRoutes);
app.use('/api', inviteRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello, the server is running!");
});

export default app;
