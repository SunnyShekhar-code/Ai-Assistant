import React, { useContext, useRef, useState } from 'react'
import Card from './card'
import { RiImageAiLine } from "react-icons/ri";
import img1 from "../assets/aiImg1.avif"
import img2 from "../assets/aiImg2.jpeg"
import img3 from "../assets/aiImg3.jpeg"
import img4 from "../assets/aiImg4.jpg"
import img5 from "../assets/aiImg5.jpeg"
import img6 from "../assets/aiImg6.jpeg"
import img7 from "../assets/aiImg7.avif"
import { userDataContext } from '../context/userContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";


const Customize = () => {
    const navigate= useNavigate();
     const {serverUrl,userData,setUserdata,frontendImg,setFrontendImg,backendImg,setBackendImg,selectedImage,setSelectedImage}= useContext(userDataContext);
     const inputImage=useRef();
     const handleImage=(e)=>{
        const file= e.target.files[0];
        setBackendImg(file);
        setFrontendImg(URL.createObjectURL(file));
     }

  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col p-[20px] relative'>
      <IoMdArrowBack className='absolute top-[30px] left-[30px] text-white w-[25px] cursor-pointer' onClick={()=>navigate("/")} />

        <h1 className='text-white mb-[40px] text-[30px] text-center'> Select your <span className='text-blue-300'>Assistant Image</span></h1>
        <div className='w-full max-w-[900px] flex justify-center items-center flex-wrap gap-[15px]'>
        <Card image={img1}/>
        <Card image={img2}/>
        <Card image={img3}/>
        <Card image={img4}/>
        <Card image={img5}/>
        <Card image={img6}/>
        <Card image={img7}/>

            <div className={`w-[70px] h:[140px] lg:w-[150px] lg:h-[250px] bg-[#020220] border-2 border-[#0000ff66] rounded-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white flex items-center justify-center ${selectedImage=="input"? "border-4 border-white":null}`}
            onClick={()=>{inputImage.current.click();
                setSelectedImage("input");
             }}>
            {!frontendImg && <RiImageAiLine className='text-white w-[25px] h-[25px]' />}
            {frontendImg && <img src={frontendImg} className='h-full object-cover' />}
            </div>
           <input type="file" accept='image/*' ref={inputImage} hidden onChange={handleImage}/>   // can remove && condition
        </div>
        {selectedImage && <button className='min-w-[150px] h-[60px] mt-[30px] text-black font-semibold bg-white rounded-3xl text-[19px] hover:bg-gray-400 cursor-pointer' onClick={()=>navigate("/customize2")}>Next</button>}
    </div>
  
  )
}

export default Customize
  // image and assistance name