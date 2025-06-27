import express from "express";
import { getCurrentUser, updateAssistant } from "../Controllers/user_controller.js";
import Auth from "../Middlewares/auth.js";
import uploadMulter from "../Middlewares/multer.js";


const userRoute=express.Router();

userRoute.post("/current",Auth,getCurrentUser);
userRoute.post("/update",Auth,uploadMulter.single("assistantImage"),updateAssistant);

// updateAssistant
export default userRoute;


//  const handleUpdateAssistant= async()=>{
//       console.log(assistantName);
//       setLoading(true);
//       try{
//         let formdata= new FormData()
//         formdata.append("assistantName",assistantName);

//         if(backendImg){
//           formdata.append("assistantImage",backendImg);
//         }else{
//           formdata.append("imageUrl",selectedImage);
//         }

//         const result=await axios.post(`${serverUrl}/api/user/update`,formdata,{withCredentials:true});
 
//         // console.log(result);
//         console.log(result);
//         // { formdata: {} }

//         setUserdata(result?.data);
//         setLoading(false);
//         navigate("/");
//       }catch(err){
//         setLoading(false);
//         console.log(err);
//       }
//     }