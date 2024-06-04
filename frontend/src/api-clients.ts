import { RegisteredFormData } from "./pages/Register"
import { SignInFormData } from "./pages/SignIn"
import {HotelType} from '../../backend/src/model/hotel'

const API_BASE_URL=import.meta.env.VITE_API_BASE_URL


export const register=async (formData:RegisteredFormData)=>{

    const response=await fetch(`${API_BASE_URL}/api/users/register`,{
        method:'POST',
        credentials:"include",
        headers:{
            "Content-type":"application/json",

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
        "Content-type":"application/json",

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
            console.log(response);
            
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


    export const addMyHotel=async(hotelFormData:FormData)=>{

        const response=await fetch(`${API_BASE_URL}/api/my-hotels`,{
            credentials:"include",
            method:"POST",
            
            
            body:hotelFormData // actually it is hotelFormData


        })

        if(!response.ok){
            throw new Error ('Failed to add hotel')
        }
        return  response.json()
    }


    export const fetchMyHotels=async():Promise<HotelType[]>=>{

        const response=await fetch(`${API_BASE_URL}/api/my-hotels`,{

            method:"GET",
            credentials:'include',

        

        })

        if(!response.ok){
            throw new Error('Error fetching hotels')
        }
        return response.json()
        
    }