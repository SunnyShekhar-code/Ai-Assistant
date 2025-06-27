
import jwt from "jsonwebtoken"

const Auth = (req,res,next) => {
    try{
        const token=req.cookies.token;

        if (!token) {
            console.log("Token not found in cookies", req.cookies);
            return res.status(400).json({ message: "token not found" });
        }

        const verifyToken= jwt.verify(token,process.env.JWT_SECRETE);
        req.userId=verifyToken.userId;
        next();

    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Auth middleware error occured"});
    }
}

export default Auth;