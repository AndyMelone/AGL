import express from "express";
import mainRouter from "./main.routes";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { seedCompany } from "./seeders/initalCompany";

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use(bodyParser.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://rhm.vercel.app",
      "https://melones-projects.vercel.app",
      "https://fnmxkmq78-melones-projects.vercel.app",
    ],
    credentials: true,
  })
);

async function startServer() {
  try {
    await seedCompany();
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
}

startServer();

// const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api", mainRouter);

app.listen(5000, () => {
  console.log(`Server is running on port ${5000}`);
});
