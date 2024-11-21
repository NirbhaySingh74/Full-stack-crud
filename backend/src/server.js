import dotenv from "dotenv";
import app from "./app.js"; // Import the app setup from app.js

dotenv.config();

const PORT = process.env.PORT || 5000; // Default to port 5000

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
