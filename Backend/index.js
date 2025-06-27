import express from "express";
import dotenv from "dotenv"
import dbConnect from "./Config/dbConnect.js";
import authRoute from "./Routes/auth_route.js";
import cookieParser from "cookie-parser"
import cors from "cors"
import userRoute from "./Routes/user_route.js";

dotenv.config();

const app=express();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth",authRoute);
app.use("/api/user",userRoute);
// "http://localhost:5000/api/auth/signnup"

const PORT=process.env.PORT || 5000;
app.listen(PORT,async()=>{
    await dbConnect();
    console.log(`Server are running at port ${PORT}`);
    
});

