import { Request } from '../models/requestModel.js';

// POST: /api/request
export const createRequest = async (req, res) => {
  try {
    const { assetType, justification, neededBy } = req.body;

    const newRequest = new Request({
      requestedBy: req.user._id,
      assetType,
      justification,
      neededBy,
    });

    const saved = await newRequest.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create request', error });
  }
};

// GET: /api/request/my
export const getMyRequests = async (req, res) => {
  try {
    const requests = await Request.find({ requestedBy: req.user._id }).populate('requestedBy', 'name email');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch requests', error });
  }
};

// GET: /api/request/pending (Manager only)
export const getPendingRequests = async (req, res) => {
  try {
    if (req.user.role !== 'manager') return res.status(403).json({ message: 'Forbidden' });

    const requests = await Request.find({ status: 'Pending' }).populate('requestedBy', 'name email');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch pending requests', error });
  }
};

// PATCH: /api/request/:id
export const updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, managerComments } = req.body;

    if (req.user.role !== 'manager') return res.status(403).json({ message: 'Forbidden' });

    const updated = await Request.findByIdAndUpdate(
      id,
      { status, managerComments },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Request not found' });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update request', error });
  }
};
