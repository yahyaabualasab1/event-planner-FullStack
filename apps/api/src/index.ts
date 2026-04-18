import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "node:dns/promises";
dns.setServers(["1.1.1.1"]);
dotenv.config();
const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT) || 3000;
const MONGODB_URI =
  process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/event-planner";
app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

async function main() {
  await mongoose.connect(MONGODB_URI);
  app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
