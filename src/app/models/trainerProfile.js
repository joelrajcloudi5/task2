import mongoose from 'mongoose';

const certificationSchema = new mongoose.Schema({
  name: String,
  fileData: String
});

const documentSchema = new mongoose.Schema({
  name: String,
  fileData: String
});

const trainerSchema = new mongoose.Schema({
  basicInfo: {
    firstName: { type: String, required: true },
    lastName: String,
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    gender: String,
    pincode: String,
    country: { type: String, default: 'India' },
    state: String,
    district: String,
    city: String,
    languagesSpoken: [String]
  },
  professionalDetails: {
    designation: String,
    skills: [String],
    experience: String,
    prevCompany: String,
    degree: String,
    course: String,
    certifications: [certificationSchema]
  },
  workTeachingExperience: {
    experienceLevel: String,
    coursesTaught: [String],
    teachingMode: String,
    expectedSalary: Number
  },
  additionalInfo: {
    bio: String,
    status: { type: String, default: 'Active' }
  },
  documents: {
    aadhaar: String,
    pan: String,
    aadhaarFileData: String,
    panFileData: String,
    resumeFileData: String,
    tenthCertFileData: String,
    additionalDocuments: [documentSchema]
  }
}, { timestamps: true });

export default mongoose.models.Trainer || mongoose.model('Trainer', trainerSchema);