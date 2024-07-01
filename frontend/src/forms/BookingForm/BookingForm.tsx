import { useForm } from "react-hook-form"
import { PaymentIntentResponse, UserType } from "../../../../backend/src/shared/types"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { StripeCardElement } from "@stripe/stripe-js"
import { useSearchContext } from "../../contexts/SearchContext"
import { useParams } from "react-router-dom"
import { useMutation } from "react-query"
import * as apiClient from '../../api-clients'
import { useAppContext } from "../../contexts/Appcontext"

type Props={
   currentUser:UserType,
   paymentIntent:PaymentIntentResponse
}

export type BookingFormData={
    firstName:string,
    lastName:string,
    email:string,
    checkIn:string,
    checkOut:string,
    adultCount:number,
    childCount:number,
    paymentIntentId:string,
    hotelId:string,
    totalCost:number
}

const BookingForm = ({currentUser,paymentIntent}:Props) => {

    const stripe=useStripe()
    const elements=useElements()
    const search=useSearchContext()
    const {hotelId}=useParams()
    const {showToast}=useAppContext()
    

    const {mutate:bookRoom,isLoading}=useMutation(apiClient.createRoomBooking,{
        onSuccess:()=>{
            showToast({message:"Booking Saved!",type:'SUCCESS'})
        },
        onError:()=>{
            showToast({message:"Error Saving!",type:'ERROR'})

        }
    })

    const {handleSubmit,register}= useForm<BookingFormData>({
        defaultValues:{
            firstName:currentUser.firstName,
            lastName:currentUser.lastName,
            email:currentUser.email,
            checkIn:search.checkIn.toISOString(),
            checkOut:search.checkOut.toISOString(),
            adultCount:search.adultCount,
            childCount:search.childCount,
            hotelId:hotelId,
            totalCost:paymentIntent.totalCost,
            paymentIntentId:paymentIntent.paymentIntentId
        }
    })

    const onSubmit=async(formData:BookingFormData)=>{

        if(!stripe || !elements){
            return
        }

        const result=await stripe.confirmCardPayment(paymentIntent.clientSecret,{ 

            payment_method:{
                card:elements.getElement(CardElement) as StripeCardElement
            }
        })

        if(result.paymentIntent?.status==='succeeded'){
            //book the room

            bookRoom({...formData,paymentIntentId:result.paymentIntent.id})
        }
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)} action="" className="grid grid-cols-1 rounded-lg border border-slate-300 p-4 gap-5">
        
        <span className="text-xl font-bold">Confirm your Details</span>
        <div className="grid grid-cols-2 gap-5"> 

        <label htmlFor="" className="text-gray-700 text-sm font-bold">
            FirstName:
            <input type="text" className="mt-1 py-1 rounded text-gray-700 bg-gray-200 w-full" 
             readOnly
             disabled
             {...register('firstName')}
             />
        </label>
        <label htmlFor="" className="text-gray-700 text-sm font-bold">
            LastName:
            <input type="text" className="mt-1 py-1 rounded text-gray-700 bg-gray-200 w-full"
             readOnly
             disabled
             {...register('lastName')}
             />
             </label>
        <label htmlFor="" className="text-gray-700 text-sm font-bold">
            Email:
            <input type="text" className="mt-1 py-1 rounded text-gray-700 bg-gray-200 w-full"
             readOnly
             disabled
             {...register('email')}
             />
        </label>
        </div>
        <div className="space-y-2">
            <h2 className="text-xl font-semibold">Your Price Summary</h2>

            <div className="bg-blue-200 p-4 rounded-md">
        <div className="font-semibold text-lg">
        TotalCost:${paymentIntent.totalCost.toFixed(2)}
        </div>
        <div className="text-xs">Include Taxes and charges</div>
        </div>
        </div>
        
        <div className="space-y-2">
            <h3 className="text-xl font-semibold">Payment Details</h3>
            <CardElement id='payment-element' className="border rounded-md p-2 text-sm"/>
        </div>

        <div className="flex justify-end">
            <button disabled={isLoading} className="bg-blue-600 p-2  text-white font-bold disabled:bg-gray-500 hover:bg-blue-400">{isLoading?'Saving...':'Confirm Booking'}</button>
        </div>
    </form>
  )
}

export default BookingForm