import React, { createContext } from 'react'
import axios from "axios";
import { useState } from 'react';
import { useEffect } from 'react';
export const userDataContext= createContext();

const UserContext = ({children}) => {
    const serverUrl="http://localhost:5000"
    const [userData,setUserdata]= useState(null);
    const [frontendImg,setFrontendImg]=useState(null);
    const [backendImg,setBackendImg]=useState(null);
    const [selectedImage,setSelectedImage]= useState(null);

    const handleCurrentUser= async()=>{
      try{
        const result=await axios.post(`${serverUrl}/api/user/current`,{},{withCredentials:true});

        setUserdata(result?.data);
        console.log(result?.data);
      }catch(err){
        console.log("Current user error", err.response?.data || err.message);
      }
    }

    useEffect(()=>{
      handleCurrentUser();
    },[])


    const value={serverUrl,userData,setUserdata,frontendImg,setFrontendImg,backendImg,setBackendImg,selectedImage,setSelectedImage}
  return (
    <div>
        <userDataContext.Provider value={value} >
            {children}
        </userDataContext.Provider>
    </div>
  )
}

export default UserContext