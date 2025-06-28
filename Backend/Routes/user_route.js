import express from "express";
import { askToAssistant, getCurrentUser, updateAssistant } from "../Controllers/user_controller.js";
import Auth from "../Middlewares/auth.js";
import uploadMulter from "../Middlewares/multer.js";


const userRoute=express.Router();

userRoute.post("/current",Auth,getCurrentUser);
userRoute.post("/update",Auth,uploadMulter.single("assistantImage"),updateAssistant);
userRoute.post("/asktoassistant",Auth,askToAssistant);

export default userRoute;

