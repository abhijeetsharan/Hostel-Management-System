import userModel from "../models/userModel.js";
import Notification from "../models/notificationModel.js";
import Contact from "../models/contactModel.js";
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

//Notification COntroller
export const getNotifications = async (req, res) => {
  try {
    const userId = req.body.userId;

    const notifications = await Notification.find({
      $or: [{ recipient: userId }, { recipient: null }],
    }).sort({ dateSent: -1 })
    
    return res.json({ success: true, notifications })

  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

//Contact Page controller
export const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    if(!name || !email || !message){
      return res.status(400).json({ success: false, message: 'Please fill all fields' });
    }

    //Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email address' })
    }

    //Save the contact form data to the database
    const contact = new Contact({ name, email, message });
    await contact.save();

    res.status(201).json({ success: true, message: 'Thank you for contacting us! We will get back to you soon.' });
    
  } catch (error) {
      res.status(500).json({ success: false, message: error.message })
  }
}
