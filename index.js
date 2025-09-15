import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import db from "./utils/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.send(`your server is healthy & running on verison: ${process.version}`);
});

db();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
