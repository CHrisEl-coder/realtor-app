import React from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import logo from './chris.png'









export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();

    function locDesign (route) {
        if (route === location.pathname) {
            return true
        }
    } 

  return (
    <div className="bg-white border-b shadow-sm sticky z-50">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div>
            <img src={logo} alt='Logo' className="h-20 cursor-pointer" onClick={() => navigate("/")}/> 
        </div>
        <div>
            <ul className="flex space-x-10">
                <li 
                  className={`cursor-pointer py-3 text-sm font-semibold ${
                    locDesign("/") && "text-[#00154077] border-b-[2px] border-b-[#e56717]"}`}
                  onClick={() => {
                      navigate("/")
                      }
                      }>Home</li>
                <li 
                  className={`cursor-pointer py-3 font-semibold text-sm ${
                    locDesign("/profile") && "text-[#00154077] border-b-[2px] border-b-[#e56717]"}`}
                onClick={() => {
                  navigate("/profile")
                }}>Profile</li>
                <li className={`cursor-pointer py-3 font-semibold text-sm ${locDesign("/offers") && "text-[#00154077] border-b-[2px] border-b-[#e56717]"}`}
                onClick={()=> {
                  navigate("/offers")
                }}>Offers</li>
                 <li className={`cursor-pointer py-3 font-semibold text-sm  ${locDesign("/sign-up") && "text-[#00154077] border-b-[2px] border-b-[#e56717]"}`}
                onClick={()=> {
                  navigate("/sign-up")
                }}>Register</li>
            </ul>
        </div>
       
      </header> 
    </div>
 
  )
}
