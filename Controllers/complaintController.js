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
        category: req.body.category
    });

    try {
        await comp.save();  // Save the complaint to the database
        res.json({ success: true, message: "Complaint added successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error saving complaint" });
    }
};

export { addComp };
