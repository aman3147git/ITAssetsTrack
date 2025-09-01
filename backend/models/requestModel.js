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
  approvedBy: {   
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null 
  },
  submittedAt: { 
    type: Date, 
    default: Date.now 
  },
}, { timestamps: true });

export const Request = mongoose.model('Request', requestSchema);
