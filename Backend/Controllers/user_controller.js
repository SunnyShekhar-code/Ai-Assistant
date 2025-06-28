import User from "../Models/userModel.js";
import upload from "../Config/cloudinary.js";
import geminiResponse from "../gemini.js";
import moment from "moment/moment.js";

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

export const askToAssistant= async(req,res)=>{
    try{
        const {command}=req.body;
        const user= await User.findById(req.userId);
        const userName=user.name;
        const assistantName=user.assistantName
        const result=await geminiResponse(command,assistantName,userName)

        const jsonMatch=result.match(/{[\s\S]*}/);
        if(! jsonMatch) return res.status(400).json({response: "Sorry I cant understand"});

        const gemResult=JSON.parse(jsonMatch[0]);
        const type=gemResult.type;

        switch(type){
            case 'get-date':
                return res.json({
                    type,
                    userInput:gemResult.userInput,
                    response:`current date is ${moment().format("YYY-MM-DD")}`
                })
            
            case 'get-time':
                return res.json({
                    type,
                    userInput:gemResult.userInput,
                    response:`current time is ${moment().format('hh:mm:ss A')}`
                })
            
            case 'get-day':
                return res.json({
                    type,
                    userInput:gemResult.userInput,
                    response:`today is ${moment().format('dddd')}`
                })

            case 'get-month':
                return res.json({
                    type,
                    userInput:gemResult.userInput,
                    response:`current time is ${moment().format('MMMM')}`
                })
            
            case "google-search":
            case "youtube-search":
            case "youtube-play":
            case "general":
            case "instagram-open":
            case "facebook-open":
            case "weather-show":
                return res.json({
                    type,
                    userInput:gemResult.userInput,
                    response:gemResult.response,
                });

                default:
                    return res.status(400).json({response: "I didn't understand that command."})

        }
        



    }catch(err){
        return res.status(500).json({response: "askToAssistant Error!"})
    }
}