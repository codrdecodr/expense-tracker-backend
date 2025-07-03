const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const expenseRoutes = require("./routes/Expenses");
const authRoutes = require("./routes/auth");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());

// MongoDB connection
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true }
);


const db = mongoose.connection;
db.on("error", (error) => console.error("MongoDB connection error:", error));
db.once("open", () => console.log("✅ Connected to MongoDB"));


// Routes 
app.use("/auth", authRoutes);
app.use("/Expenses", expenseRoutes);

// Global error handler 
app.use((err, req, res, next) => {
  console.error("🔥 Global Error Handler:", err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Server listener
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
