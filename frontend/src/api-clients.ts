import { RegisteredFormData } from "./pages/Register"
import { SignInFormData } from "./pages/SignIn"
import {HotelType} from '../../backend/src/model/hotel'
import {HotelSearchResponse, PaymentIntentResponse, UserType} from '../../backend/src/shared/types'
import { BookingFormData } from "./forms/BookingForm/BookingForm"


const API_BASE_URL=import.meta.env.VITE_API_BASE_URL


export const fetchCurrentUser= async ():Promise<UserType>=>{
    const response=await fetch(`${API_BASE_URL}/api/users/me`,{

        credentials:'include'
    })

    if(!response.ok){

        throw new Error("Error fetching user")
    }

   return response.json()
}

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

    // Viewing my added hotels

    
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

        // editing my hotels 

    export const fetchMyHotelById=async(hotelId:string):Promise<HotelType>=>{

        const response=await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`,{
            credentials:"include",
            method:"GET"
        })

        if(!response.ok){
            throw new Error("Error in fetching hotel by id")
        }

        return response.json()
    }

    //updated case

    export const updateMyHotelById=async(hotelFormdata:FormData)=>{
        const response=await fetch(`${API_BASE_URL}/api/my-hotels/${hotelFormdata.get("hotelId")}`,{
            method:'PUT',
            credentials:'include',
            body:hotelFormdata
        })

        if(!response.ok){
            throw new Error('Failed to update hotel')
        }
        return response.json()
    }

    export type SearchParams={
        destination?:string,
        checkIn?:string,
        checkOut?:string,
        adultCount?:string,
        childCount?:string,
        page?:string,
        facilities?:string[],
        types?:string[],
        stars?:string[],
        maxPrice?:string,
        sortOption?:string
    }

    export const searchHotels=async(searchParams:SearchParams): Promise<HotelSearchResponse>=>{

        const queryParams=new URLSearchParams()
        queryParams.append('destination',searchParams.destination || '')
        queryParams.append('checkIn',searchParams.checkIn || '')
        queryParams.append('checkOut',searchParams.checkOut || '')
        queryParams.append('adultCount',searchParams.adultCount || '')
        queryParams.append('childCount',searchParams.childCount || '')
        queryParams.append('page',searchParams.page || '')
        

        queryParams.append('maxPrice',searchParams.maxPrice || '')
        queryParams.append('sortOption',searchParams.sortOption || '')
        searchParams.facilities?.forEach((facility)=>{
            queryParams.append('facilities',facility)
        })
        searchParams.types?.forEach((type)=>{
            queryParams.append('types',type)
        })
        searchParams.stars?.forEach((star)=>{
            queryParams.append('stars',star)
        })
        const response=await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`)

        if(!response.ok){
            throw new Error("Failed to search hotels")
        }

        return response.json()
    }

    export const fetchHotels=async():Promise<HotelType[]>=>{

        const response=await fetch(`${API_BASE_URL}/api/hotels`)
        if(!response.ok){
            throw new Error("Error fetching hotels")
        }
        return response.json()
    }

    export const fetchHotelById=async(hotelId:string):Promise<HotelType>=>{

        const response=await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`)

        if(!response.ok){
            throw new Error("Error fetching Hotels")
        }

        return response.json()
    }

    export const createPaymentIntent=async (hotelId:string,numberOfNights:string):Promise<PaymentIntentResponse>=>{

        const response=await fetch(`${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`,{
            credentials:'include',
            method:'POST',
            body:JSON.stringify({numberOfNights}),
            headers:{
                "Content-type":"application/json"
            }
        })
        if (!response.ok){
            throw new Error("Error fetching payment-intent")
        }

        return response.json()
    }

    export const createRoomBooking=async(formData:BookingFormData)=>{

        const response=await fetch(`${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`,{

            method:"POST",
            credentials:'include',
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(formData)
        })

        if(!response.ok){
            throw new Error("Error booking room")
        }
    }


    export const fetchMyBookings=async():Promise<HotelType[]>=>{

        const response=await fetch(`${API_BASE_URL}/api/my-bookings`,{

            credentials:"include"
        })

        if(!response.ok){
            throw new Error("Unable to fetch hotel bookings")
        }

        return response.json()
    }