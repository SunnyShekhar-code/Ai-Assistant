import mongoose from "mongoose";

const dbConnect=async()=>{
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("Db Connected");
    }catch(err){
        console.log(err.message);
    }
}

export default dbConnect;