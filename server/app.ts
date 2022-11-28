import express from "express";
import authRoute from "./auth-route";

export const app = express();

app.use("/api", authRoute);

app.get("/api/hello", (req, res) => {
  res.json({ greeting: "hello" });
});
