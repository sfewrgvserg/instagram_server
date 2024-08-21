import cors from "cors";
import express from "express";
import "dotenv/config";

const app = express();

import mediaRoutes from "./routes/mediaRoutes.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", mediaRoutes);

app.listen(process.env.PORT || 3002, () => {
  console.log("connection to mongodb");
});
