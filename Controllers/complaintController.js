import compliantModel from "../Model/complaint.js";
import fs from 'fs'

// Add complaint function
const addComp = async (req, res) => {
    console.log("File:", req.file);  
    console.log("Body:", req.body); 

    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // Get the uploaded file's filename
    let image_filename = req.file.filename;

    // Create a new complaint with the received data
    const comp = new compliantModel({
        name: req.body.name,
        Room: req.body.Room,
        description: req.body.description,
        image: image_filename,
        category: req.body.category,
        person:req.body.person ,
    });

    try {
        await comp.save();  // Save the complaint to the database
        res.json({ success: true, message: "Complaint added successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error saving complaint" });
    }
};


// list the all compliants 
const lists = async ( req, res ) => {
     try {
         const comps = await compliantModel.find({ person : 'student'});
         res.json({success:true, data : comps})
     } catch( error) {
        console.log(error);
        res.json({success:false , message:"Error"})
     }
}

const listw = async( req, res ) => {
    try {
        const compw = await compliantModel.find({ person : 'worker'});
        res.json({success:true, data :compw })
    } catch( error) {
       console.log(error);
       res.json({success:false , message:"Error"})
    }
}

const removecomp = async( req, res ) => {
    try {
       // Ensure the ID is provided in the request body
       const complaintId = req.body.id;
       if (!complaintId) {
           return res.status(400).json({ success: false, message: "No complaint ID provided" });
       }

       // Find the complaint by ID
       const comp = await compliantModel.findById(complaintId);

       // If the complaint doesn't exist, return an error
       if (!comp) {
           return res.status(404).json({ success: false, message: "Complaint not found" });
       }

       // Remove the image associated with the complaint if it exists
       if (comp.image) {
           fs.unlink(`uploads/${comp.image}`, (err) => {
               if (err) {
                   console.error("Error deleting image:", err);
               }
           });
       }

       // Delete the complaint from the database
       await compliantModel.findByIdAndDelete(complaintId);
       res.json({ success: true, message: "Complaint removed" });
    } catch ( error ) {
         console.log(error);
         res.json({ success : false , message:"Error"})
    }
}


export { addComp , lists , listw, removecomp };
