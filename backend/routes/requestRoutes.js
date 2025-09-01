import express from 'express';
import {
  createRequest,
  getMyRequests,
  getPendingRequests,
  getRequestHistory,
  updateRequestStatus,
} from '../controllers/requestController.js';
import { authMiddleware } from "../utils/authMiddleware.js";

const router = express.Router();

router.post('/',authMiddleware, createRequest);
router.get('/my',authMiddleware, getMyRequests);
router.get('/pending',authMiddleware, getPendingRequests);
router.patch('/:id',authMiddleware, updateRequestStatus);

router.get('/history',authMiddleware, getRequestHistory);


export default router;
