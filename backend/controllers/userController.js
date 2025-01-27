import userModel from "../models/userModel.js";
import Notification from "../models/notificationModel.js";
import Contact from "../models/contactModel.js";
import roomModel from "../models/roomModel.js";
import VacateRoomRequest from "../models/vacateRoomModel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import Application from "../models/applicationModel.js";
import mongoose from 'mongoose';

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

//Vacate room request form
export const submitVacateRequest = async (req, res) => {
  const { rollNumber, reason, additionalDetails, vacateDate } = req.body;

  try {
    if (!rollNumber || !reason || !vacateDate) {
      return res.status(400).json({ success: false, message: 'Please fill all fields' })
    }

    // Validate Reason
    const validReasons = ['internship', 'medical', 'personal'];
    
    if (!validReasons.includes(reason)) {
      return res.status(400).json({ success: false, message: 'Invalid reason' })
    }

    //Vaidate VacateDate
    const currentDate = new Date();
    const inputDate = new Date(vacateDate);
    if (inputDate <= currentDate) {
      return res.status(400).json({ success: false, message: 'Invalid date' })
    }

    // Check if the student exists and is allocated a room
    const student = await userModel.findOne({ rollNumber });
    
    if(!student){
      return res.status(400).json({ success: false, message: 'Student not found' })
    }
    // Check if the student is allocated a room
    // if (!student.room) {
    //   return res.status(400).json({ success: false, message: 'Student is not allocated a room.' });
    // }

    // Check for duplicate pending requests
    const existingRequest = await VacateRoomRequest.findOne({ rollNumber, status: 'pending' });
    if (existingRequest) {
      return res.status(400).json({ success: false, message: 'You have already submitted a vacate request.' });
    }

    //create a new vacate room request
    const vacateRequest = new VacateRoomRequest({
      rollNumber,
      reason,
      additionalDetails,
      vacateDate,
    });
    await vacateRequest.save();

    res.status(201).json({ success: true, message: 'Vacate room request submitted successfully' })

  } catch (error) {
    console.error('Error submitting vacate room request:', error);
    res.status(500).json({ success: false, message: 'An error occurred while submitting the request.' });
  }
}

export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    
    // Validate userId
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: 'Invalid or missing user ID' });
    }

    // Retrieve user profile
    const userdata = await userModel
      .findById(userId)
      .select('-password -verifyOtp -verifyOtpExpireAt -__v -resetOtp -resetOtpExpireAt -isAccountVerified -_id'); // Exclude sensitive fields like password

    // Check if user exists
    if (!userdata) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Return the user data
    res.status(200).json({ success: true, user: userdata });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ success: false, message: 'An error occurred while fetching the user profile' });
  }
}

export const updateUserProfile = async (req, res) => {
  const { userId } = req.body;
  
  const updatedData = req.body;

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Fields that shouldn't be updated
    const uneditableFields = ['name', 'email', 'hostel', 'room'];

    uneditableFields.forEach((field) => {
      if (updatedData[field]) {
        delete updatedData[field];
      }
    });

    // Update the user document
    Object.assign(user, updatedData);
    await user.save();

    res.status(200).json({ success: true, message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}