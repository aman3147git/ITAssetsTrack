import { User } from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export const Register=async(req,res)=>{
    const {name,email,password,role}=req.body;
    try{
    if(!name|| !email|| !password){
        return res.status(401).json({
            message:"invalid data",
            success:false
        })
    }
    const user=await User.findOne({email});
    if(user){
        return res.status(401).json({
            message:"Email is already taken",
            success:false
        })
    }
    const hashedpass=bcryptjs.hashSync(password,10);
    await User.create({
        name,email,
        password:hashedpass,
        role: role || "employee"
    });
    return res.status(200).json({
        message:"Account created",
        success:true
    })
}catch(error){
    console.log(error);
}

}

export const Login=async(req,res)=>{
    const {email,password}=req.body;
    try{
    if(!email|| !password){
        return res.status(401).json({
            message:"invalid data",
            success:false
        })
    }
    const user=await User.findOne({email});
    if(!user){
        return res.status(401).json({
            message:"Never loggedin before",
            success:false
        })
    }
    const isMatch=await bcryptjs.compare(password,user.password);
    if(!isMatch){
        return res.status(401).json({
            message:"Incorrect password",
            success:false
        }) 
    }
    const token=jwt.sign({id:user._id, role: user.role },process.env.SECRET_KEY);

    return res.status(200).cookie("token",token,{httpOnly:true}).json({
        message:`Welecome back ${user.name}`,
        user,
        success:true
    })
}catch(error){
    console.log(error);
}
}

export const Logout=(req,res)=>{
    return res.status(200).clearCookie("token").json({
        message:"User logged out successfully",
        success:true
    })
}

