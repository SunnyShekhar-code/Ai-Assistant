import React, { useContext } from 'react'
import { userDataContext } from '../context/userContext'

const Card = ({image}) => {
  const {serverUrl,userData,setUserdata,frontendImg,setFrontendImg,backendImg,setBackendImg,selectedImage,setSelectedImage}= useContext(userDataContext);
  return (
    <div className={`w-[70px] h:[140px] lg:w-[150px] lg:h-[250px] bg-[#020220] border-2 border-[#0000ff66] rounded-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white ${selectedImage==image? "border-4 border-white":null}`}
     onClick={()=>{
      setSelectedImage(image);
      setBackendImg(null);
      setFrontendImg(null);
     }}>
        <img src={image} alt="" className='h-full object-cover overflow-hidden rounded-2xl'/>

    </div>
  )
}

export default Card