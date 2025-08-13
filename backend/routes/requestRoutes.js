import express from 'express';
import {
  createRequest,
  getMyRequests,
  getPendingRequests,
  updateRequestStatus,
} from '../controllers/requestController.js';

const router = express.Router();

router.post('/', createRequest);
router.get('/my', getMyRequests);
router.get('/pending', getPendingRequests);
router.patch('/:id', updateRequestStatus);

export default router;
