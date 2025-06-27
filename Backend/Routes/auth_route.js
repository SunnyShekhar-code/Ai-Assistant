import express from "express";
import { login, logout, signup } from "../Controllers/auth_controller.js";

const authRoute=express.Router();

authRoute.post("/signup",signup);
authRoute.post("/login",login);
authRoute.post("/logout",logout);

export default authRoute;