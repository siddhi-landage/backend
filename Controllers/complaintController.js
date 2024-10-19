import compliantModel from "../Model/complaint.js";

// Add complaint function
const addComp = async (req, res) => {
    console.log("File:", req.file);  // Log the file to check if it's being uploaded
    console.log("Body:", req.body);  // Log the request body to debug

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
        person:req.body.person
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

const listw = async ( req, res ) => {
    try {
        const compw = await compliantModel.find({ person : 'worker'});
        res.json({success:true, data :compw })
    } catch( error) {
       console.log(error);
       res.json({success:false , message:"Error"})
    }
}

const removecomp = async ( req, res ) => {
    try {

    } catch ( error ) {

    }
}
export { addComp , lists , listw, removecomp };
