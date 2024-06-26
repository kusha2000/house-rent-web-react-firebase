import React, { useState } from 'react'
import signUpLogo from '../assets/signUp.jpg';
import {AiFillEyeInvisible,AiFillEye} from "react-icons/ai"
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import {getAuth,createUserWithEmailAndPassword,updateProfile} from 'firebase/auth'
import {db} from "../firebase"
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [showPassword,setShowPassword]=useState(false)
  const [formData,setFormData]=useState({
    name:"",
    email:"",
    password:""
  });

  const {name,email,password}=formData
  const navigate=useNavigate()
  function onChange(e){
    setFormData((pre)=>({
      ...pre,
      [e.target.id]:e.target.value
    }))
  }
  async function onSubmit(e){
    e.preventDefault()
    try {
      const auth=getAuth()
      const userCredential= await createUserWithEmailAndPassword(auth,email,password)
      updateProfile(auth.currentUser,{
        displayName:name
      })
      const user =userCredential.user
      const formDataCopy={...formData}
      delete formDataCopy.password
      formDataCopy.timestamp=serverTimestamp()

      await setDoc(doc(db,"users",user.uid),formDataCopy)
      toast.success("Sign up was successful")

      navigate("/")
      //console.log(user);
    } catch (error) {
      toast.error("Something went wrong with the registration")
    }
  }

  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Sign Up</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'> 
          <img src={signUpLogo} alt="SignIn" className='w-full rounded-2xl'></img>
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form onSubmit={onSubmit}>
            <input type="text" id="name" value={name} onChange={onChange} placeholder='Full name' className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-grey-300 rounded transition ease-in-out'/>
            <input type="email" id="email" value={email} onChange={onChange} placeholder='Email Address' className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-grey-300 rounded transition ease-in-out'/>
            <div className='relative mb-6'>
              <input type={showPassword ? "text" : "password"} id="password" value={password} onChange={onChange} placeholder='Password' className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-grey-300 rounded transition ease-in-out'/>
              {
                showPassword ? (
                  <AiFillEyeInvisible className='absolute right-3 top-2 text-3xl cursor-pointer' onClick={()=>setShowPassword((pre)=>!pre)}/>
                ):
                (
                  <AiFillEye  className='absolute right-3 top-2 text-3xl cursor-pointer'onClick={()=>setShowPassword((pre)=>!pre)}/>
                )
              }
            </div>
            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p className='mb-6 '>Have a account?<Link to="/sign-in" className='text-green-600 hover:text-green-700 transition duration-200 ease-in-out ml-1'>Sign In</Link></p>  
              <p><Link to="/forgot-password" className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out ml-1'>Forget Password </Link></p>  
            </div> 
            <button type='submit' className='w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out active:bg-blue-800'>Sign Up</button>
            <div className='flex  items-center my-4 before:border-t  before:flex-1 before:border-grey after:border-t  after:flex-1 after:border-grey'>
              <p className='text-center font-semibold mx-4 '>OR</p>
            </div>
            <OAuth/>
          </form>
          
        </div>
      </div>
    
    </section>
  )
}

export default SignUp