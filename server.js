import express from "express";
import cors from "cors";
import { connectDB } from "./Configure/db.js";
import comRouter from "./Routes/ComRouter.js";
import userRouter from "./Routes/userRoute.js";

const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Database connection  
connectDB();

// API Endpoints 
app.use("/api/complaint", comRouter);
app.use("/api/user" , userRouter);


app.get("/", (req, res) => {
    res.send("API Working");
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
