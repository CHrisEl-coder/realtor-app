import React from 'react'
import { FcGoogle } from 'react-icons/fc'

export default function Oauth() {
  return (
    <div className="bg-[#042703] py-2 px-16 rounded hover:bg-transparent hover:border-2 transition ease-in-out duration-300 flex items-center justify-center space-x-1">
         <FcGoogle className='bg-white rounded-full'/>
    <button className='font-semibold text-white'>Continue With Google</button>
    </div>
   
  )
}
