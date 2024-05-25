import { SignInFormData } from "./pages/SignIn"


const API_BASE_URL=import.meta.env.VITE_API_BASE_URL
type RegisteredFormData={

    firstName:string,
    lastName:string,
    email:string,
    password:string,
    confirmPassword:string
}

export const register=async (formData:RegisteredFormData)=>{

    const response=await fetch(`${API_BASE_URL}/api/users/register`,{
        method:'POST',
        credentials:"include",
        headers:{
            'content-type':"application/json",

        },
        body:JSON.stringify(formData)
    })

    const responseBody= await response.json()

    if(!response.ok){
        throw new Error(responseBody.message)
    }
}

//fetch request for login 


    export const signIn= async (formData:SignInFormData)=>{

const response=await fetch(`${API_BASE_URL}/api/auth/login`,{
    method:'POST',
    credentials:'include',
    headers:{
        'Content-type':'application/json',

    },
    body:JSON.stringify(formData)
    
})

const body=await response.json()

    if(!response.ok){
        throw new Error(body.message)
    }
        return body
    }

    export const validateToken= async ()=>{
        const response=await fetch(`${API_BASE_URL}/api/auth/validate-token`,{credentials:"include"})

        if(!response.ok){
            throw new Error("token invalid")
        }
      
        return response.json()
    }

    // fetch request for calling logout token

    export const signOut=async ()=>{

        const response=await fetch(`${API_BASE_URL}/api/auth/logout`,{
            method:"POST",
            credentials:"include"
            
        })
        if(!response.ok){
            throw new Error("Something went wrong during signout")
        }
    }