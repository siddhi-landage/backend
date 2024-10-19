import userModel from "../Model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import 'dotenv/config.js'

//login 
const loginUser = async(req,res) => {
 const {name , password , email} = req.body;
 const user = await userModel.findOne({email});
try {
 if (!user) {
  return res.json ( { success : false , message : "User Not exist"})
 }

 const isMatch = await bcrypt.compare(password , user.password);

 if(!isMatch){
  return res.json ( { success : false , message : "Enter correct password"})
 }

 const token = creatToken(user._id);
 res.json({success:true , token})
  } catch( error) {
    console.log(error);
    res.json({sucess:false , message:"Error"})
  }
}

const creatToken  = (id) => {
    return jwt.sign( {id}, process.env.JWT_SECRET)
}

// register
const registerUser = async(req,res) => {
    const {name , password , email} = req.body;
    
  try {
    const exist = await userModel.findOne({email})
    if ( exist ) {
        return res.json ( { success : false , message : "User Alredy exist"})
    }
     if ( !validator.isEmail(email)) {
        return res.json ( { success : false , message : "Enter valid email"})
     }

     if ( password.length < 8) {
      return res.json ( {success:false , message:"Enter Strong password"})
     }
// hash the password 
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash( password, salt);

     const newUser = new userModel( {
        name : name,
        email : email,
        password:hashedPassword,

     });
      
     const  user = await newUser.save(); 
     const token = creatToken(user._id);
     res.json({success:true , token})
  } catch (error) {

      console.log("Registration error:", error); // Log the error for debugging
      res.json({ success: false, message: "An error occurred during registration" });
      
    }
    
}

export { loginUser , registerUser};