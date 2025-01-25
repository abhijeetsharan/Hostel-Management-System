import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollnumber: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  dob: { type: Date, required: true },
  email: { type: String, required: true },
  roomType: { type: String, required: true },
  gender: { type: String, required: true },
  program: { type: String, required: true },
  department: { type: String, required: true },
  course: { type: String, required: true },
  admissionReceipt: { type: String, required: true }, // Cloudinary URL
  feeReceipt: { type: String, required: true }, // Cloudinary URL
});

const Application = mongoose.model('Application', applicationSchema);

export default Application;