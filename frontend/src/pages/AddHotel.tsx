import { useMutation } from "react-query"
import { useAppContext } from "../contexts/Appcontext"
import * as apiClient from '../api-clients'
import ManageHotelForm from "../forms/ManageHotelForms/ManageHotelForm"


const AddHotel = () => {
  const {showToast}=useAppContext()
  const {mutate,isLoading}=useMutation(apiClient.addMyHotel,{
    onSuccess:()=>{
        showToast({message:"Hotel Booked",type:"SUCCESS"})
    },
    onError:()=>{
      showToast({message:"Error Booking Hotel",type:'ERROR'})
    }
  })

  const handleSave=(hotelFormData:FormData)=>{
    mutate(hotelFormData)
  }
  return (
    <ManageHotelForm onSave={handleSave} isLoading={isLoading}   />
  )
}

export default AddHotel