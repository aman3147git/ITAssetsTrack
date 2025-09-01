import { Request } from '../models/requestModel.js';

export const createRequest = async (req, res) => {
  try {
    const { assetType, justification, neededBy } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!assetType || !justification || !neededBy) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newRequest = new Request({
      requestedBy: req.user._id,
      assetType,
      justification,
      neededBy,
    });

    const saved = await newRequest.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Create request error:", error);
    res.status(500).json({ message: 'Failed to create request', error: error.message });
  }
};


export const getMyRequests = async (req, res) => {
  try {
    const requests = await Request.find({ requestedBy: req.user._id,approvedBy: req.user._id }).populate('requestedBy', 'name email')
    .populate('approvedBy', 'name email');
    console.log(requests);
    
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch requests', error });
  }
};


export const getPendingRequests = async (req, res) => {
  try {
    if (req.user.role !== 'manager') return res.status(403).json({ message: 'Forbidden' });

    const requests = await Request.find({ status: 'Pending' }).populate('requestedBy', 'name email');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch pending requests', error });
  }
};


export const updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, managerComments } = req.body;

    if (req.user.role !== 'manager') return res.status(403).json({ message: 'Forbidden' });

    const updated = await Request.findByIdAndUpdate(
      id,
      { status, managerComments,approvedBy: req.user._id  },
      { new: true }
    ).populate('requestedBy', 'name email')
    .populate('approvedBy', 'name email');

    if (!updated) return res.status(404).json({ message: 'Request not found' });
    console.log("Updated request:", updated);
    
  } catch (error) {
    res.status(500).json({ message: 'Failed to update request', error });
  }
};

export const getRequestHistory = async (req, res) => {
  try {
    if (req.user.role !== 'manager') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const requests = await Request.find({
      status: { $in: ['Approved', 'Rejected','Pending'] }
    })
      .populate('requestedBy', 'name email')
      .populate('approvedBy', 'name email')
      .sort({ updatedAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch request history', error });
  }
};
