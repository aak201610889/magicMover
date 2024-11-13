// src/app.ts
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import magicmoverRoutes from "./src/routes/MagicMoverRoutes";
import magicitemRoutes from "./src/routes/MagicItemRoutes";
import missionlogRoutes from "./src/routes/MissionLogRoutes";
import { setupSwagger } from './swagger';
import 'reflect-metadata';
import './src/shared/utils/tsyringeConfig'
// Load environment variables
dotenv.config();

// Initialize the Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Define routes
app.use("/magic-mover", magicmoverRoutes);
app.use("/magic-item", magicitemRoutes);
app.use("/mission-log", missionlogRoutes);

// Serve static files (uploads)
app.use("/uploads", express.static("uploads"));

// Swagger setup
setupSwagger(app);

// Export the app for use in server.ts
export default app;
