const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const demoRoute = require("./routes/demoRoute");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

dotenv.config();
connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/", demoRoute);
app.use("/auth", authRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is started at port number ${PORT}`);
});
