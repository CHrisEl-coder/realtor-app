import { useState } from "react"
import { BiUserCircle } from 'react-icons/bi'
import { CiUser } from 'react-icons/ci'
import { BsEnvelopeAt } from 'react-icons/bs'
import { VscEyeClosed, VscEye } from 'react-icons/vsc'
import { Link } from 'react-router-dom'
import Oauth from "../components/Oauth"

export default function SignIn () {
    const [FormData, setFormData] = useState({
        first: '',
        password: '',
        email: '',
        last: ''

    })

    const [showPassword, setShowPassword] = useState(false)

    const {first, password, email, last} = FormData;

   function onChange(e) {
    setFormData((prevState) => ({
        ...prevState, [e.target.id]: e.target.value,
    }));
   }

   
    return (
                
        <section className="sign-sec">
            <div className="sign-main">
            <BiUserCircle id="head-icon" className=""/>
                <div className="form">
                    <form className="fm space-y-10">
                        <div className="user">
                          <input type='text' id='first' placeholder="First-Name" value={first} className="w-full " onChange={onChange}/>
                          <CiUser className="icon"/>
                        </div>
                        <div className="last">
                            <input type='text' id='last' placeholder="Last-Name" value={last} className="w-full" onChange={onChange}/>
                            <CiUser className="icon"/>
                        </div>
                        <div className="mail">
                            <input type='email' id='email' placeholder="Enter Your Email" value={email} className="w-full" onChange={onChange}/>
                            <BsEnvelopeAt className="icon"/>
                        </div>
                        <div className="pass">
                             <input type={showPassword ? 'text' : 'password'} id='password' placeholder="Password" className="w-full" value={password} onChange={onChange}/>
                             {showPassword ? <VscEye className="icon cursor-pointer" onClick={() => setShowPassword((prevState) => !prevState)}/> : <VscEyeClosed className="icon cursor-pointer" onClick={() => setShowPassword((prevState) => !prevState)}/>}
                        </div>
                        <div className="flex flex-col justify-center items-center space-y-3">
                            <button type="submit" className="bg-[#010130] py-2 px-16 rounded text-white font-semi-bold hover:bg-transparent hover:border-2 transition ease-in-out duration-300">Sign-In</button>

                            <div className="flex before:border-t before:flex-1 items-center after:border-t after:flex-1 w-full mx-4"><p className="text-white font-semibold text-center mx-2">OR</p></div>

                            <Oauth/>
                        </div>
                    </form>
                    <div className="flex justify-around text-blue-500 font-semibold lg:text-[0.875rem] text-[0.75rem] my-4">
                        <Link to="/sign-in" className="hover:text-blue-950 transition ease-in-out duration-200 shadow-md hover:shadow-lg active:scale-110">Log-In</Link>
                        <Link to="/forgot-password" className="hover:text-blue-950 transition ease-in-out duration-200 shadow-md hover:shadow-lg">Forgot Password?</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}