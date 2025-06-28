import React from 'react'
import { userDataContext } from '../context/userContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const Home = () => {
  const {serverUrl,userData,setUserdata,getGeminiResponse}= useContext(userDataContext);
  const navigate= useNavigate();

  const handleLogout= async(req)=>{
    try{
      const result= await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials:true});
      setUserdata(null);
    }catch(err){
      setUserdata(null);
      console.log(err);
    }
  }

  useEffect(()=>{
    const speechReconisation = window.SpeechRecognitionAlternative || window.webkitSpeechRecognition;
    const recognition= new speechReconisation();
    recognition.continuous=true;
    recognition.lang='en-US'
    
    recognition.onresult= async (e)=>{
      const transcript=e.results[e.results.length-1][0].transcript.trim();
      console.log("heard :"+ transcript);

      if(transcript.toLowerCase().includes(userData.assistantName.toLowerCase())){
        const data= await getGeminiResponse(transcript);
        console.log(data);
      }else console.log("pronounce assistantName correctly")
    }
    recognition.start();
  },[]);



  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col gap-[15px]'>
       <button className='min-w-[150px] h-[60px] mt-[30px] text-black font-semibold bg-white rounded-3xl text-[19px] hover:bg-gray-400 absolute top-[2px] right-[20px] cursor-pointer' onClick={handleLogout}>Log Out</button>
        <button className='min-w-[200px] h-[60px] mt-[30px] text-black font-semibold bg-white rounded-3xl text-[19px] hover:bg-gray-400 absolute right-[20px] top-[80px] cursor-pointer' onClick={()=>navigate("/customize")}>Customise Assistant</button>

      <div className='w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg'>
        <img src={userData?.assistantImage} alt="" className='h-full object-cover'/>
      </div>
      <h1 className='text-white text-[18px] font-semibold'>
        I'm {userData?.assistantName}
      </h1>
      </div>
  )
}

export default Home