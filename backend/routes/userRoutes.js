import express from "express";
import { Delete, Login, Logout, Register, Update } from "../controllers/userController.js";
import { verifytoken } from "../utils/authMiddleware.js";
const router=express.Router();
router.post('/register',Register);
router.post('/login',Login);
router.get('/logout',Logout);

router.delete('/delete/:userid',verifytoken,Delete);
router.post('/update/:userid',verifytoken,Update);
export default router;