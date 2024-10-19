import express from "express";
import { addComp } from "../Controllers/complaintController.js";
import multer from "multer";
import fs from "fs";

const comRouter = express.Router();

// Create the Uploads directory if it doesn't exist
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Multer setup for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads"); // Ensure the folder is named correctly
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Route to add a new complaint
comRouter.post("/add", upload.single("image"), addComp);

export default comRouter;
