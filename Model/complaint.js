import mongoose from "mongoose";

const compliantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    Room: { type: Number, required: true },
    image: { type: String, required: true }, 
    category: { type: String, required: true },
    person : { type:String , required:true},
});

const compliantModel = mongoose.models.compliant || mongoose.model("compliant", compliantSchema);
export default compliantModel;
