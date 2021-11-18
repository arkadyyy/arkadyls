const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const { generateUploadURL } = require("./s3/s3");

const connectDB = require("./connectToDB");
const { user_router } = require("./routes/user_routes/user_routes");
const { auth_router } = require("./routes/auth_routes/auth_routes");

connectDB();

const app = express();

dotenv.config();
app.use(express.json());
app.use(cookieParser());
// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(
  cors({
    credentials: true,
    origin: "http://ec2-3-86-138-22.compute-1.amazonaws.com",
  })
);

app.use(user_router);
app.use(auth_router);

app.get("/", (req, res) => {
  res.send("shalom !");
});

app.get("/api/s3_url", async (req, res) => {
  const url = await generateUploadURL();
  res.send({ url });
});

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(process.env.PORT, () => {
  console.log(`server is running ! on port ${process.env.PORT}`);
});
