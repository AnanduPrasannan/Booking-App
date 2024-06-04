import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query"
import * as apiClient from '../api-clients'
import { useAppContext } from "../contexts/Appcontext"
import { Link, useNavigate } from "react-router-dom"

export type SignInFormData={
    email:string,
    password:string
}

const SignIn=()=>{
   const {showToast}= useAppContext()
   const navigate=useNavigate()
  const queryClient=useQueryClient()

    const {register,formState:{errors},handleSubmit}=useForm<SignInFormData>()

    const mutation=useMutation(apiClient.signIn,{
       
        onSuccess:async()=>{
            showToast({message:"Sign in successfully",type:"SUCCESS"})
           await queryClient.invalidateQueries('validateToken')
            navigate('/')

        },
        onError:(error:Error)=>{
          
            showToast({message:error.message,type:"ERROR"})
        }
    })
    const onSubmit=handleSubmit((data)=>{
        mutation.mutate(data)
    })
    return(

        <form action="" className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Sign In</h2>
            <label htmlFor="" className="text-black font-bold text-sm">
            Email
            <input className="border rounded  w-full" type="email" {...register('email',{required:"this field is required"})} />
                 <span className="text-red-500 font-mono">{errors.email?.message}</span>
        </label>
        <label htmlFor="" className="text-black font-bold text-sm">
            Password
            <input className="border rounded  w-full" type="password" {...register('password',{required:"this field is required",minLength:{
                value:6,
                message:"Password must be atleast 6 characters"
            }})} />
                 <span className="text-red-500 font-mono">{errors.password?.message}</span>
        </label>
        <span>
            <span>
               <Link to='/register'> Not yet registered?</Link> 
            </span>
            <button type='submit' className="flex items-center px-3 py-2 bg-blue-900 font-bold text-white rounded-md hover:opacity-75"> Login</button>
        </span>
        </form>
    )
}

export default SignIn