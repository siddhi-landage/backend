import express from "express";
import { addComp , lists , listw , removecomp } from "../Controllers/complaintController.js";
import multer from "multer";
import fs from "fs";

const comRouter = express.Router();

// Create the Uploads directory if it doesn't exist
// const uploadDir = './Uploads';+
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir);
// }

// Multer setup for file storage
const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req, file, cb) => {
         return cb(null ,`${Date.now()}${file.originalname}`)
    }
});

const upload = multer({ storage: storage });

// Route to add a new complaint
comRouter.post("/add", upload.single("image"), addComp);
comRouter.get("/student", lists);
comRouter.get("/worker" , listw);
comRouter.post("/remove" , removecomp);
export default comRouter;
