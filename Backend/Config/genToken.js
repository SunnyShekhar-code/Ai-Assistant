import jwt from "jsonwebtoken";

const genToken=async (userId)=>{
    try{
       const token= await jwt.sign({userId},process.env.JWT_SECRETE,{expiresIn:"4d"});
       return token;
    }catch(err){
        console.log(err.message);
    }
}

export default genToken;