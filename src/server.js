require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const userRoutes = require("./routes/user.routes");

const app = express();

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
// connectDB();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.url);
  next();
});

// Routes
app.use("/api", userRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Backend server is running",
  });
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error.message);
    process.exit(1);
  }
};

startServer();
