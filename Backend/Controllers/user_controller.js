import User from "../Models/userModel.js";
import upload from "../Config/cloudinary.js";
export const getCurrentUser=async(req,res)=>{
    try{
        const userId=req.userId;
        const user= await User.findById(userId).select("-password");
        if(!user) return res.status(400).json({message:"user not found!!"})
        return res.status(200).json(user);

    }catch(err){
        console.log(err);
        return res.staus(400).json({message:"error from get current user"});
    }
}

export const updateAssistant= async (req,res)=>{
    // assistantName   assistantImage    
    try{
        // console.log(req.body);
        const {assistantName, imageUrl}=req.body;
        let assistantImage;

        if(req.file){
            assistantImage=await upload(req.file.path)
        }else{
            assistantImage= imageUrl
        }

        const user= await User.findByIdAndUpdate(req.userId,{
            assistantName, assistantImage
        },{new: true}).select("-password");
        
        return res.status(200).json(user);
    }catch(err){
        console.log(err);
        return res.staus(400).json({message:"update Assistant Error"});
    }
}