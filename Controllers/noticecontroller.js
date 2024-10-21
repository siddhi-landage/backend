import noticemodel from "../Model/noticemodel.js";
import fs from 'fs'

const addNotice = async (req, res) => {
    console.log("File:", req.file);  
    console.log("Body:", req.body);

    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // Get the uploaded file's filename
    let image_filename = req.file.filename;

    // Create a new complaint with the received data
    const notice = new noticemodel({
       subject : req.body.subject,
       Date : req.body.Date,
       image : image_filename
    });

    try {
        await notice.save();  // Save the notice to the database
        res.json({ success: true, message: "Notice added successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error saving Notice" });
    }
};

const listall = async ( req, res ) => {
    try {
        const notices = await noticemodel.find({});
        res.json({success:true, data : notices})
    } catch( error) {
       console.log(error);
       res.json({success:false , message:"Error"})
    }
}

const removenotice = async ( req, res ) => {
    try {
       // provided id in req
       const noticeId = req.body.id;
       if (!noticeId) {
           return res.status(400).json({ success: false, message: "No notice ID provided" });
       }

       // Find the notice by ID
       const notice = await noticemodel.findById(noticeId);

       // If the complaint doesn't exist, return an error
       if (!notice) {
           return res.status(404).json({ success: false, message: "Complaint not found" });
       }

       // Remove the image associated with the complaint if it exists
       if (notice.image) {
           fs.unlink(`Notices/${notice.image}`, (err) => {
               if (err) {
                   console.error("Error deleting notice:", err);
               }
           });
       }

       // Delete the complaint from the database
       await noticemodel.findByIdAndDelete(noticeId);
       res.json({ success: true, message: "Notice removed" });
    } catch ( error ) {
         console.log(error);
         res.json({ success : false , message:"Error"})
    }
}

export { addNotice , listall , removenotice }