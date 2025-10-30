import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: { 
    type: String, 
    required: true 
  },
  email: {
    type: String,
    required: true,
    unique: true, // This ensures one email per user
    lowercase: true // This makes searching easier
  },
  phone: { 
    type: String, 
    required: true 
  },
}, { 
  // This adds 'createdAt' and 'updatedAt' fields automatically
  timestamps: true 
});

const User = mongoose.model('User', userSchema);

export default User;