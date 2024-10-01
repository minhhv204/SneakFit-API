import express from "express";
import cors from "cors";
import connectMongoDB from "./config/dbconfig";
import router from "./routes";

const app = express();
app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const dbUrl = process.env.DB_URI || "mongodb+srv://phucvan050004:050004@cluster0.g8zgd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

connectMongoDB(dbUrl);

app.use("/", router);

export const viteNodeApp = app;
