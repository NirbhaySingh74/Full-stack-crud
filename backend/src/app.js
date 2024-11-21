import express from 'express';
import cors from 'cors'; 
import dotenv from 'dotenv';
import userRoutes from './routes/useRoutes.js';
import inviteRoutes from './routes/inviteRoutes.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

// Enable CORS for specific origin or allow all origins (use cautiously in production)
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = ['http://localhost:5173', 'https://full-stack-crud-beta.vercel.app'];
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true); 
    } else {
      callback(new Error('Not allowed by CORS')); // Reject the origin
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions)); 

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
