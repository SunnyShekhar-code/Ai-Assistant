import React, { useContext, useState } from 'react'
import signupbg from "../assets/signupbg.jpg";
import { IoMdEyeOff } from "react-icons/io";
import { IoEyeSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userDataContext } from '../context/userContext';


const Login = () => {
    const [showpassword,setshowPassword] = useState(false);
    const [email,setEmail] =useState("");
    const [password,setPassword] =useState("");
    const [loading,setLoading] =useState(false);
    const [error,setError] = useState("");
    const navigate= useNavigate();
    const {serverUrl,userData,setUserdata}=useContext(userDataContext);

    const handleSignIn=async(e)=>{
        e.preventDefault();
        setLoading(true);
        setError("");
        try{
            const response=await axios.post(`${serverUrl}/api/auth/login`,{
                email,password
            },
            {
                withCredentials:true
            }
        );

        setLoading(false);
        setUserdata(response?.data);
        navigate("/")
        }catch(err){
        setLoading(false);
        console.log(err);
        setError(err?.response?.data?.message || err.message || "Something went wrong");
        setUserdata(null);
        }
    }

  return (
    <div className='w-full h-[100vh] bg-cover flex justify-center' style={{backgroundImage:`url(${signupbg})`}}>
        <form className='w-[90%] h-[600px] max-w-[500px] bg-[#00000062] backdrop-blur-lg shadow-lg
         shadow-black flex flex-col justify-center items-center mt-[100px] gap-[20px] px-[20px]'  onSubmit={handleSignIn}>
            <h1 className='text-white text-[30px] font-semibold mb-[30px] '>Login to <span className='text-blue-300'> Ai Assistants</span></h1>

            <input type="email" placeholder='Enter your Email' autoComplete='email'
             className='w-full h-[60px] outline-none border-2 border-white bg-transparent
              text-white placeholder-gray-400 px-[20px] py-[10px] rounded-3xl text-[18px]' 
              value={email} required onChange={(e)=>setEmail(e.target.value)}
              />

            <div className='w-full h-[60px] border-2 border-white bg-transparent text-white rounded-3xl text-[18px] relative'>
                <input type={showpassword?"text":"password"} placeholder='password' autoComplete='current-password' className='w-full h-full rounded-3xl outline-none bg-transparent placeholder-gray-400 px-[20px] py-[10px]'
                    value={password} required onChange={(e)=>setPassword(e.target.value)}
                />
                {showpassword && <IoMdEyeOff className='absolute top-[18px] right-[20px] w-[25px] h-[25px] text-white cursor-pointer' onClick={()=>setshowPassword(!showpassword)}/>}
                {!showpassword &&<IoEyeSharp className='absolute top-[18px] right-[20px] w-[25px] h-[25px] text-white cursor-pointer' onClick={()=>setshowPassword(!showpassword)}/>}
            </div>
            
            <button className='min-w-[150px] h-[60px] mt-[30px] text-black font-semibold bg-white rounded-3xl text-[19px] hover:bg-gray-400' disabled={loading}>{loading? "Loading...":"Login"}</button>

            <p className='text-white text-[18px] ' >Want to create account? <span className='text-blue-500 cursor-pointer' onClick={()=>navigate("/signup")} >Sign Up</span></p>

              {error && <p className='text-red-500 font-semibold px-[17px]'> *{error} </p>}
        </form>
    </div>
  )
}

export default Login