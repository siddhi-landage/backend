import express from "express"
import {  addNotice , listall , removenotice } from "../Controllers/noticecontroller.js"
import multer from "multer";
import fs from "fs";

const noticeRouter = express.Router();
const store = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Notices"); 
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const notice = multer({ storage: store });
noticeRouter.post("/add", notice.single("image"), addNotice);
noticeRouter.get("/list", listall);
noticeRouter.post("/remove" , removenotice);
export default noticeRouter;