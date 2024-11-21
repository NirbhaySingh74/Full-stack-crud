import express from 'express';
import {
  signUp,
  login,
  logout,
  getAllUsers,
  updateUser,
  deleteUser,
} from '../controllers/useController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/signup', signUp); 
router.post('/login', login);

// Protected routes
router.post('/logout', authenticate, logout); 
router.get('/users', authenticate, getAllUsers); 
router.put('/users/:id', authenticate, updateUser); 
router.delete('/users/:id', authenticate, deleteUser); 

export default router;
