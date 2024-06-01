import React, { useState } from 'react'
import forgotLogo from '../assets/forgot.jpg';
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';


const ForgotPassword = () => {
  const [email,setEmail]=useState("")

  function onChange(e){
    setEmail(e.target.value)
  }


  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Forgot Password</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'> 
          <img src={forgotLogo} alt="SignIn" className='w-full rounded-2xl'></img>
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form >
            <input type="email" id="email" value={email} onChange={onChange} placeholder='Email Address' className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-grey-300 rounded transition ease-in-out'/>
            
            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p className='mb-6 '>Don't have an account?<Link to="/sign-up" className='text-green-600 hover:text-green-700 transition duration-200 ease-in-out ml-1'>Register</Link></p>  
              <p><Link to="/sign-in" className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out ml-1'>Sign in instead</Link></p>  
            </div> 
            <button type='submit' className='w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out active:bg-blue-800'>Send Reset Password</button>
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

export default ForgotPassword