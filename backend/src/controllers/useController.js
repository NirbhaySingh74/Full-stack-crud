import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

// Sign Up
export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login
// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await prisma.user.findUnique({ where: { email } });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
//       expiresIn: "1h",
//     });

//     res
//       .status(200)
//       .cookie("authToken", token, {
//         httpOnly: true, // Prevents JavaScript access to the cookie
//         secure: process.env.NODE_ENV === "production", // Use secure cookies in production
//         sameSite: "strict", // Prevent CSRF
//         maxAge: 3600000, // 1 hour
//       })
//       .json({ message: "Login successful" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
// Login API
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .cookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600000,
      })
      .json({ message: "Login successful", user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Logout
export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .clearCookie("authToken", { httpOnly: true, sameSite: "strict" })
      .json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Users (Protected)
export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update User
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const inviteUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const newUser = await prisma.user.create({
      data: { name, email, role },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
