import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import {Button, Input, Logo} from "./index"
import { Link,useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { useForm } from 'react-hook-form'

function SignUp() {
    const navigate=useNavigate()
    const [error,setError]=useState("")
    const dispatch=useDispatch()
    const {register,handleSubmit}=useForm();

    const create=async(data)=>{
        setError("")
        try {
            const userData=await authService.createAccount(data)
            if(userData){
                const userData=await authService.getCurrentUser()
                if(userData){
                    dispatch(login(userData))
                }
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <div className='flex items-center justify-cener w-full'>
    <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className='mb-2 flex justify-center'>
            <span className='inline-block w-full max-w-[100px]'>
                <Logo width='100%'/>
            </span>
        </div>
        <h2 className='text-center text-2xl font-bold leading-tight'> sign up to create an account</h2>
        <p className='mt-2 text-center text-base text-black/60'>
            Already have an account?&nbsp;
            <Link to='/login'
                className='font-medium text-primary transition-all duration-200 hover:underline'
            >
                Login
            </Link>
        </p>
        {error && <p className='text-red-500 mt-8 text-center'>{error} </p>}
        <form onSubmit={handleSubmit(create)} className='mt-8'>
            <div className='space-y-5'>
                <Input 
                label="Name: "
                placeholder="Enter your Name.."
                {...register("name",{
                    required:true,
                })}

                />
                <Input
                    label="Email: "
                    placeholder="enter your email..."
                    type="email"
                    {...register("email",{
                        required:true,
                        validate:{
                            matchPatern: (value)=> /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.
                            test(value) || "Enter valid Email Address"
                        }
                    })}
                />

                <Input  
                label="password: " 
                type="password"
                placeholder="Enter your password"
                {...register("password",{
                    required:true,
                })}
                />
                <Button type='submit'
                className='w-full'
                > Create Account</Button>
            </div>
        </form>
    </div>
  
</div>

  )
}

export default SignUp