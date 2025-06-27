import React, { useContext, useState } from 'react'
import signupbg from "../assets/signupbg.jpg";
import { IoMdEyeOff } from "react-icons/io";
import { IoEyeSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userDataContext } from '../context/userContext';


const Signup = () => {
    const [showpassword,setshowPassword] = useState(false);
    const [name,setName] =useState("");
    const [email,setEmail] =useState("");
    const [password,setPassword] =useState("");
    const [error,setError] =useState("");
    const [loading,setLoading]= useState(false);
    const navigate= useNavigate();
    const {serverUrl,userData,setUserdata}=useContext(userDataContext);

    const handleSignUp=async(e)=>{
        setError("");
        e.preventDefault();
        setLoading(true);
        try{
            const response=await axios.post(`${serverUrl}/api/auth/signup`,{
                name,email,password
            },
            {
                withCredentials:true
            }
        );
        setLoading(false);
        setUserdata(response?.data);
        navigate("/customize");
        // console.log(response);
        }catch(err){
        console.log(err);
        setError(err?.response?.data);
        setLoading(false);
        setUserdata(null);
        }
    }

  return (
    <div className='w-full h-[100vh] bg-cover flex justify-center' style={{backgroundImage:`url(${signupbg})`}}>
        <form className='w-[90%] h-[600px] max-w-[500px] bg-[#00000062] backdrop-blur-lg shadow-lg
         shadow-black flex flex-col justify-center items-center mt-[100px] gap-[20px] px-[20px]'  onSubmit={handleSignUp}>
            <h1 className='text-white text-[30px] font-semibold mb-[30px] '>Register to <span className='text-blue-300'> Ai Assistants</span></h1>

            <input type="text" placeholder='Enter your Name'
             className='w-full h-[60px] outline-none border-2 border-white bg-transparent
              text-white placeholder-gray-400 px-[20px] py-[10px] rounded-3xl text-[18px]'
              value={name} required onChange={(e)=>setName(e.target.value)}
              />
            
            <input type="email" placeholder='Enter your Email'
             className='w-full h-[60px] outline-none border-2 border-white bg-transparent
              text-white placeholder-gray-400 px-[20px] py-[10px] rounded-3xl text-[18px]' 
              value={email} required onChange={(e)=>setEmail(e.target.value)}
              />

            <div className='w-full h-[60px] border-2 border-white bg-transparent text-white rounded-3xl text-[18px] relative'>
                <input type={showpassword?"text":"password"} placeholder='password' className='w-full h-full rounded-3xl outline-none bg-transparent placeholder-gray-400 px-[20px] py-[10px]'
                    value={password} required onChange={(e)=>setPassword(e.target.value)}
                />
                {showpassword && <IoMdEyeOff className='absolute top-[18px] right-[20px] w-[25px] h-[25px] text-white cursor-pointer' onClick={()=>setshowPassword(!showpassword)}/>}
                {!showpassword &&<IoEyeSharp className='absolute top-[18px] right-[20px] w-[25px] h-[25px] text-white cursor-pointer' onClick={()=>setshowPassword(!showpassword)}/>}
            </div>
            
            <button className='min-w-[150px] h-[60px] mt-[30px] text-black font-semibold bg-white rounded-3xl text-[19px] hover:bg-gray-400' disabled={loading}>{loading?"Loading...":"Sign Up"}</button>
            
            <p className='text-white text-[18px] ' >Already have an account? <span className='text-blue-500 cursor-pointer' onClick={()=>navigate("/login")} >Login</span></p>

            {error && 
            <p className='text-red-500 font-semibold px-[17px]'> *{error} </p>
            }
        </form>
    </div>
  )
}

export default Signup




// import React, { useState, useContext } from 'react';
// import frontImage from '../assets/frontimage.jpg'; 
// import { IoMdEye, IoMdEyeOff } from "react-icons/io";
// import { useNavigate } from 'react-router-dom';
// import { userDataContext } from '../context/userContext';
// import axios from "axios";

// const Signup = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const { serverUrl } = useContext(userDataContext);
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     try {
//       const result = await axios.post(`${serverUrl}/api/auth/signup`, {
//         name, email, password
//       }, {
//         withCredentials: true
//       });
//       console.log("✅ Signup Success:", result.data);
//       // Optionally redirect or show message
//     } catch (error) {
//       console.error("❌ Signup Failed:", error);
//     }
//   };

//   return (
//     <div
//       className="w-full h-[100vh] bg-cover flex justify-center"
//       style={{
//         backgroundImage: `url(${frontImage})`,
//         backgroundPosition: 'center',
//       }}
//     >    
//       <form className='w-full h-[600px] max-w-[500px] bg-black/30 backdrop-blur
//       shadow-lg shadow-black flex flex-col items-center justify-center gap-[20px] px-[20px]' 
//       onSubmit={handleSignUp}>
//         <h1 className='text-white text-[30px] font-semibold mb-[30px] px-[20px]'>
//           Register to <span className='text-gray-900'>Virtual Assistant</span>
//         </h1>

//         <input type='text' placeholder='Enter your Name'
//           className='border-2 w-full h-[60px] border-white bg-transparent outline-none
//           text-white placeholder-gray px-[20px] py-[10px] rounded-full text-[18px]'
//           required onChange={(e) => setName(e.target.value)} value={name} />

//         <input type='email' placeholder='Enter your Email'
//           className='border-2 w-full h-[60px] border-white bg-transparent outline-none
//           text-white placeholder-gray px-[20px] py-[10px] rounded-full text-[18px]'
//           required onChange={(e) => setEmail(e.target.value)} value={email} />

//         <div className='border-2 w-full h-[60px] border-white bg-transparent 
//         text-white placeholder-gray rounded-full text-[18px] relative'>
//           <input type={showPassword ? "text" : "password"} placeholder='password'
//             className='w-full outline-none h-full rounded-full placeholder-gray px-[20px] py-[10px] bg-transparent'
//             required onChange={(e) => setPassword(e.target.value)} value={password} />
          
//           {!showPassword && (
//             <IoMdEye className='absolute top-[18px] right-[20px] w-[25px] h-[25px] text-white cursor-pointer'
//               onClick={() => setShowPassword(true)} />
//           )}
//           {showPassword && (
//             <IoMdEyeOff className='absolute top-[18px] right-[20px] w-[25px] h-[25px] text-white cursor-pointer'
//               onClick={() => setShowPassword(false)} />
//           )}
//         </div>

//         <button className='min-w-[150px] h-[60px] bg-white rounded-full text-black font-semibold
//         text-[19px] mt-[30px]'>
//           SignUp
//         </button>

//         <p className='text-white text-[18px] cursor-pointer' onClick={() => navigate("/login")}>
//           Already have an account? <span className='text-blue-900'>Login</span>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Signup;