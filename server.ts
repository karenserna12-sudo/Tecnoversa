/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
import fs from "fs";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Temporary in-memory / JSON fallback store for requests if MongoDB is not connected
const DATA_DIR = path.join(process.cwd(), "data");
const FALLBACK_FILE = path.join(DATA_DIR, "solicitudes_fallback.json");

// Ensure fallback directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Lazy database connection state
let isMongoConnected = false;
const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;

// Define Mongoose Schema & Model
const ServiceRequestSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ServiceRequestModel = mongoose.models.ServiceRequest || mongoose.model("ServiceRequest", ServiceRequestSchema);

// Try connecting to MongoDB Atlas if available
async function connectToMongo() {
  if (isMongoConnected) return true;
  
  if (!MONGO_URI) {
    console.warn("⚠️ MONGODB_URI environment variable is not defined. Falling back to local JSON persistence.");
    return false;
  }

  try {
    console.log("🔌 Connecting to MongoDB Atlas...");
    await mongoose.connect(MONGO_URI);
    isMongoConnected = true;
    console.log("✅ Successfully connected to MongoDB Atlas!");
    return true;
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB Atlas:", error);
    isMongoConnected = false;
    return false;
  }
}

// Initialize database check asynchronously on startup
connectToMongo();

// API Endpoints
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "tecnoversa" && password === "S0c2024Fr4nch0") {
    console.log("🔓 Successful admin login from IP:", req.ip);
    return res.json({ 
      success: true, 
      message: "Autenticación exitosa", 
      token: "tecnoversa-admin-token-2026" 
    });
  }

  console.warn("🔒 Failed admin login attempt for user:", username);
  return res.status(401).json({ 
    success: false, 
    message: "Usuario o contraseña incorrectos." 
  });
});

app.post("/api/solicitudes", async (req, res) => {
  const { fullName, email, phone, service, message } = req.body;

  if (!fullName || !email || !phone || !service || !message) {
    return res.status(400).json({ 
      success: false, 
      message: "Todos los campos son obligatorios (Nombre, Correo, Teléfono, Servicio, Mensaje)." 
    });
  }

  const isConnected = await connectToMongo();

  if (isConnected) {
    try {
      const newRequest = new ServiceRequestModel({ fullName, email, phone, service, message });
      const savedRequest = await newRequest.save();
      return res.status(201).json({
        success: true,
        message: "¡Solicitud guardada con éxito en MongoDB Atlas!",
        data: savedRequest,
        db: "mongodb"
      });
    } catch (dbError) {
      console.error("Error saving to MongoDB, falling back...", dbError);
    }
  }

  // Fallback persistence using local JSON file
  try {
    let requestsList = [];
    if (fs.existsSync(FALLBACK_FILE)) {
      const fileContent = fs.readFileSync(FALLBACK_FILE, "utf-8");
      requestsList = JSON.parse(fileContent || "[]");
    }

    const localRequest = {
      id: "req_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
      fullName,
      email,
      phone,
      service,
      message,
      createdAt: new Date().toISOString()
    };

    requestsList.push(localRequest);
    fs.writeFileSync(FALLBACK_FILE, JSON.stringify(requestsList, null, 2), "utf-8");

    console.log("💾 Request saved locally in fallback JSON file:", localRequest.id);
    return res.status(201).json({
      success: true,
      message: "¡Solicitud guardada con éxito (Persistencia de Respaldo Local)! Configura MONGODB_URI en producción.",
      data: localRequest,
      db: "local_json"
    });
  } catch (err) {
    console.error("Critical: Failed to save fallback data", err);
    return res.status(500).json({
      success: false,
      message: "No se pudo guardar la solicitud debido a un error interno del servidor."
    });
  }
});

// GET endpoint to fetch submitted requests (for review)
app.get("/api/solicitudes", async (req, res) => {
  const token = req.headers["x-admin-token"] || req.query.token;

  if (token !== "tecnoversa-admin-token-2026") {
    return res.status(403).json({ 
      success: false, 
      message: "Acceso no autorizado. Se requiere token de administrador." 
    });
  }

  const isConnected = await connectToMongo();

  if (isConnected) {
    try {
      const requests = await ServiceRequestModel.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: requests.length, data: requests, db: "mongodb" });
    } catch (err) {
      console.error("Error retrieving requests from Mongo:", err);
    }
  }

  // Fallback to local file
  try {
    if (fs.existsSync(FALLBACK_FILE)) {
      const fileContent = fs.readFileSync(FALLBACK_FILE, "utf-8");
      const requests = JSON.parse(fileContent || "[]");
      return res.json({ success: true, count: requests.length, data: requests.reverse(), db: "local_json" });
    }
    return res.json({ success: true, count: 0, data: [], db: "local_json" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Error al recuperar solicitudes" });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok", 
    mongodb: isMongoConnected ? "connected" : "disconnected (using fallback local file)" 
  });
});

if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
  async function startDevServer() {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Tecnoversa SOC Server running in local dev mode on http://localhost:${PORT}`);
    });
  }
  startDevServer();
} else {
  const distPath = path.join(process.cwd(), "dist");
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });

  if (!process.env.VERCEL) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Tecnoversa SOC Server running on port ${PORT}`);
    });
  }
}

export default app;
