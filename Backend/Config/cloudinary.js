// import { v2 as cloudinary } from 'cloudinary';
// import fs from "fs"

// const upload=async (filepath)=>{
//     cloudinary.config({ 
//         cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//         api_key: process.env.CLOUDINARY_API_KEY, 
//         api_secret: process.env.CLOUDINARY_API_SECRET
//     })

//     try{
//         const uploadResult = await cloudinary.uploader.upload(filepath);
//         fs.unlinkSync(filepath);
//         return uploadResult.secure_url;
//     }catch(err){
//         fs.unlinkSync(filepath);
//         return res.status(500).json({message:"cloudinary error"});
//     }
   
// }

// export default upload;

import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
 const upload = async(filePath) =>{
     cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    try {
         const uploadResult = await cloudinary.uploader
       .upload(filePath)
       fs.unlinkSync(filePath)
       return uploadResult.secure_url
    } catch (error) {
        fs.unlinkSync(filePath)
        return res.status(500).json({message:"cloudinary error"})
    }
}
export default upload;