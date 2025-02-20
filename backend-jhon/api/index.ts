const express = require("express");
const cors = require("cors");
const { connectToDatabase } = require("../connect.js");
const { ObjectId } = require("mongodb");

const app = express();
const PORT = 3333;

// Middleware
app.use(express.static("public")); // Serve static files from the "public" directory
app.use(cors()); // Enable CORS for all origins

// Database connection
let db;
connectToDatabase()
  .then((database) => {
    db = database; // Store the database connection
    console.log("Connected to the database successfully!");

    // Start the server only after successful database connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit the process if database connection fails
  });

// Default route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Example route to fetch data from MongoDB
app.get("/items", async (req, res) => {
  try {
    const items = await db.collection("items").find({}).toArray();
    res.json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Export the app for testing or other uses
module.exports = app;