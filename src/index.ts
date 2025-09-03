import express from "express";
import "dotenv/config";
import productsRouter from "./products.router";
import dbConnection from "./config/dbConnection";
import cors from 'cors';

const app : express.Application = express();
app.use(cors());
app.use("/api", productsRouter);

try {
  const PORT : number = Number(process.env.PORT) || 3001
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (error) {
  console.error("Error reading environment variables:", error);
}

process.on("SIGINT", async () => {
  try {
    dbConnection.closeDb();
    console.log("Server shutting down gracefully");
    process.exit(0);
  } catch (error) {
    console.error("Error during server shutdown:", error);
    process.exit(1);
  }
});

