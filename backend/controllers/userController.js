import userModel from "../models/userModel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import Application from "../models/applicationModel.js";

export const getUserData = async (req, res) => {
    try {
        const {userId} = req.body;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({
            success: true,
            userData: {
                name: user.name,
                isAccountVerified : user.isAccountVerified
            }
        });
        
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//Application form
export const submitApplication = async (req, res) => {
    try {
      const { name, rollnumber, phone, address, dob, email, roomType, gender, program, department, course } = req.body;
      
      // Validate required fields
      if (
        [name, rollnumber, phone, address, dob, email, roomType, gender, program, department, course].some(
          (field) => field?.trim() === ''
        )
      ) {
        return res.status(400).json({ success: false, message: 'Please fill all the information' });
      }
  
      // Check if files are uploaded
      if (!req.files || !req.files['admissionReceipt'] || !req.files['feeReceipt']) {
        return res.status(400).json({ success: false, message: 'Please upload both admission receipt and fee receipt' });
      }
  
      // Upload files to Cloudinary
      const admissionReceipt = await uploadOnCloudinary(req.files['admissionReceipt'][0].path);
      const feeReceipt = await uploadOnCloudinary(req.files['feeReceipt'][0].path);
  
      // Check if files were successfully uploaded to Cloudinary
      if (!admissionReceipt || !feeReceipt) {
        return res.status(500).json({ success: false, message: 'Failed to upload files' });
      }
  
      // Save the application to the database
      const application = new Application({
        name,
        rollnumber,
        phone,
        address,
        dob,
        email,
        roomType,
        gender,
        program,
        department,
        course,
        admissionReceipt: admissionReceipt.url, // Save Cloudinary URL
        feeReceipt: feeReceipt.url, // Save Cloudinary URL
      });
  
      await application.save();
  
      res.status(201).json({ success: true, message: 'Application submitted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
};