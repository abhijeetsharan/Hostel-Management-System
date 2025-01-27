import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rollNumber: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
    },
    image: {
        type: String,
    },
    address: {
        type: Object,
        default: { line1: '', line2: '' }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        enum: ['Not Selected', 'Male', 'Female', 'Other'],
        default: 'Not Selected'
    },
    dob: {
        type: String,
        default: 'Not Selected'
    },
    password: {
        type: String,
        required: true
    },
    program: {
        type: String,
        default: ''
    },
    department: {
        type: String,
        default: ''
    },
    course: {
        type: String,
        default: ''
    },
    hostel: {
        type: String,
        default: ''
    },
    room: {
        type: String,
        default: ''
    },
    verifyOtp: {
        type: String,
        default: ''
    },
    verifyOtpExpireAt: {
        type: Number,
        default: 0
    },
    isAccountVerified: {
        type: Boolean,
        default: false
    },
    resetOtp: {
        type: String,
        default: ''
    },
    resetOtpExpireAt: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true
});

const userModel = mongoose.models.user || mongoose.model('user', userSchema)

export default userModel;