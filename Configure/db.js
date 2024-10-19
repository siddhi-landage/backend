import mongoose from "mongoose";
// acces in server.js we have o export it 
 export const connectDB = async() => {
    await mongoose.connect('mongodb+srv://landagesiddhi:Nq6tjkwSgMx13M2P@cluster0.2syu5.mongodb.net/sds_work').then(()=>console.log("DB Connected"));
}