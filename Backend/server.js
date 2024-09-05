const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const demoRoute = require("./routes/demoRoute");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/", demoRoute);
app.use("/auth", authRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is started at port number ${PORT}`);
});
