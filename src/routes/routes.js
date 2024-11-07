import express from "express";
import reportController from "../controllers/report-controller.js";

const apiBase = process.env.API_BASE || "api";
const apiVersion = process.env.API_VERSION || "v1";
const baseUrl = `/${apiBase}/${apiVersion}/pelayanan`;

const routes = express.Router();

// HEALTH CHECK
routes.get(`${baseUrl}/health`, (req, res) => res.status(200).json({ message: "OK" }));

// REPORT
routes.get(`${baseUrl}/laporan-tindakan`, reportController.getTindakans);

export default routes;