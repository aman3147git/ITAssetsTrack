import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  requestedBy: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' 
  },
  assetType: { 
    type: String, 
    enum: ['Laptop', 'Monitor', 'Keyboard', 'Mouse'] 
  },
  justification: String,
  neededBy: Date,
  status: { 
    type: String, 
    enum: ['Pending', 'Approved', 'Rejected'], 
    default: 'Pending' 
  },
  managerComments: String,
  submittedAt: { 
    type: Date, 
    default: Date.now 
  },
});

export const Request = mongoose.model('Request', requestSchema);
