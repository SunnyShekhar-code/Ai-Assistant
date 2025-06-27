import genToken from "../Config/genToken.js";
import User from "../Models/userModel.js";
import bcrypt from "bcrypt"

export const signup = async(req,res)=>{
    try{
    const {name,email,password}=req.body;

    const existingUser=await User.findOne({email});
    if(existingUser) return res.status(400).json("User Already Existing");

    if(password.length<6) return res.status(400).json("Password should be at least 6 character");

    const hashPassword= await bcrypt.hash(password,10);

    const user=await User.create({name,password:hashPassword,email});
    
    // const token=genToken({userId:user._id});
    const token=await genToken(user._id);

    res.cookie("token",token,{
        httpOnly:true,
        maxAge: 4*24*60*60*1000,
        sameSite:"Strict",
        secure:false

    });

    res.status(201).json(user);
} catch(err){
    return res.status(500).json(`signup error: ${err}`);
}

}

export const login = async(req,res)=>{
    try{
    const {email,password}=req.body;

    const user=await User.findOne({email});
    if(! user) return res.status(500).json("User not found !!");

    const matched=await bcrypt.compare(password,user.password);
   if(!matched) return res.status(500).json("Invalid Credentials!!");

    const token=await genToken(user._id);

    res.cookie("token",token,{
        httpOnly:true,
        maxAge: 4*24*60*60*1000,
        sameSite:"Strict",
        secure:false

    });

    res.status(201).json(user);
} catch(err){
    return res.status(500).json(`Login error: ${err}`);
}

}

export const logout=async (req,res)=>{
    try{
        await res.clearCookie("token");
        return res.status(400).json("logout successfully!!");
    }catch(err){
        return res.status(500).json(`logout error : ${err.essage}`);
    }
}