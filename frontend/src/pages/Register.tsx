import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query"
import * as apiClient from '../api-clients'
import { useAppContext } from "../contexts/Appcontext"
import { Link, useNavigate } from "react-router-dom"

const Register = () => {
    const navigate=useNavigate()
    const queryClient=useQueryClient()
    const {showToast}=useAppContext()

   type RegisteredFormData={

        firstName:string,
        lastName:string,
        email:string,
        password:string,
        confirmPassword:string
    }

    const {register,watch,handleSubmit,formState:{errors}}=useForm<RegisteredFormData>()

    const mutation=useMutation(apiClient.register,{

        onSuccess:async ()=>{
           showToast({message:"registration success",type:"SUCCESS"})
           await queryClient.invalidateQueries('validateToken')
           navigate('/')
        },
        onError:(error:Error)=>{
            showToast({message:error.message,type:"ERROR"})
        }
    })

let onsubmit=handleSubmit((data)=>{
    mutation.mutate(data)
})
  return (

    <> 
   <form action="" className="flex flex-col gap-5" onSubmit={onsubmit}>
    <h2 className="text-3xl font-bold">Create Account</h2>
    <div className="flex flex-col md:flex-row gap-5">
        <label htmlFor="" className="text-black font-bold text-sm ">
            FirstName
            <input className="border rounded  w-full" type="text" {...register('firstName',{required:"This field is required"})} />
              <span className="text-red-500 font-mono">{errors.firstName?.message}</span>
        </label>
        <label htmlFor="" className="text-black font-bold text-sm">
            LastName
            <input className="border rounded  w-full" type="text" {...register('lastName',{required:"this field is required"})} />
                 <span className="text-red-500 font-mono">{errors.lastName?.message}</span>
        </label>
    </div>
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
        <label htmlFor="" className="text-black font-bold text-sm">
            Confirm Password
            <input className="border rounded  w-full" type="password" {...register('confirmPassword',{validate:(val)=>{
                if(!val){
                    return "This field is required"
                }
                else if(watch("password")!==val){
                    return "Passwords do not match"
                }
            }})} />
                 <span className="text-red-500 font-mono">{errors.confirmPassword?.message}</span>
        </label>
        <span>
            <span>
                <Link to='/sign'>Already have an account?</Link>
            </span>
            <button type='submit' className="text-white font-bold px-3 rounded-md bg-blue-600 hover:bg-blue-400 py-2"> Create Account</button>
        </span>
   </form>
    </>
  )
}

export default Register