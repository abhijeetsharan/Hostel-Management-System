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
        default:'0000000000'
    },
    image: {
        type: String,
        default: ''
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
        default: 'Not Selected',
    },
    department: {
        type: String,
        default: 'Not Selected'
    },
    course: {
        type: String,
        default: 'Not Selected'
    },
    hostel: {
        type: String,
        default: ''
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        default: null
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
})

const userModel = mongoose.models.user || mongoose.model('user', userSchema)

export default userModel;