const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require ("dotenv").config();
const PORT = process.env.PORT || 8081;

// Middleware
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET','POST','PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json()); // Allows parsing of JSON requests

//Mongo connection
mongoose.connect(process.env.URI)
  .then(()=> console.log("MongoDB Connected!"))
  .catch(err =>console.error("Error in Connecting: ", err));

// Example API route
app.get("/", (req, res) => {
  res.send("Backend is running3ee!");
});

//Routes
app.use("/api/users", require("./routes/userRoute"));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});