import React, { useContext, useState } from 'react'
import { userDataContext } from '../context/userContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";

const Customize2 = () => {
  const navigate= useNavigate();
    const {setUserdata,userData,backendImg,selectedImage,serverUrl} = useContext(userDataContext);
    const [assistantName,setAssistantName]=useState(userData?.assistantName || "");
    const [loading,setLoading]=useState(false);

    const handleUpdateAssistant= async()=>{
      setLoading(true);
      try{
        let formdata= new FormData()
        formdata.append("assistantName",assistantName);

        if(backendImg){
          formdata.append("assistantImage",backendImg);
        }else{
          formdata.append("imageUrl",selectedImage);
        }

        const result=await axios.post(`${serverUrl}/api/user/update`,formdata,{withCredentials:true});
 
        // console.log(result);
        console.log(result);
        // { formdata: {} }

        setUserdata(result?.data);
        setLoading(false);
        navigate("/");
      }catch(err){
        setLoading(false);
        console.log(err);
      }
    }

  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col p-[20px] relative'>
      <IoMdArrowBack className='absolute top-[30px] left-[30px] text-white w-[25px] cursor-pointer' onClick={()=>navigate("/customize")} />
        <h1 className='text-white mb-[40px] text-[30px] text-center'> Enter your <span className='text-blue-300'>Assistant Name</span></h1>

        <input type="text" placeholder='eg. sohpia'
             className='w-[50%] h-[60px] outline-none border-2 border-white bg-transparent
            text-white placeholder-gray-400 px-[20px] py-[10px] rounded-3xl text-[18px]' 
              required  onChange={(e)=>setAssistantName(e.target.value)} value={assistantName}/>

        {assistantName && 
          <button className='min-w-[300px] h-[60px] mt-[30px] text-black font-semibold bg-white rounded-3xl text-[19px]' disabled={loading} onClick={()=>{
            handleUpdateAssistant();
            setLoading(true);
          }}>{(loading)?"Loading":"Create your Assistant"}</button>   // should not be customize2
        }

    </div>
  )
}

export default Customize2

