import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['superadmin', 'admin', 'warden', 'clerk'],
        required: true,
    },
});


// Hash password before saving
// adminSchema.pre('save', async function (next) {
//     if(!this.isModified('password')) return next();
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

export const Admin = mongoose.model('Admin', adminSchema);