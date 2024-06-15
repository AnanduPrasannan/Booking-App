import {  useMutation, useQuery } from "react-query"
import { useParams } from "react-router-dom"
import * as apiClient from '../api-clients'
import ManageHotelForm from "../forms/ManageHotelForms/ManageHotelForm"
import { useAppContext } from "../contexts/Appcontext"


const EditHotel = () => {
    
    const {hotelId}=useParams()
    const {data:hotel}=useQuery('fetchMyHotelById',()=>apiClient.fetchMyHotelById(hotelId || ''),{
      
        enabled: !! hotelId,
      
    })    
    const {showToast}=useAppContext()
    const {mutate,isLoading}=useMutation(apiClient.updateMyHotelById,{
      onSuccess:async()=>{
        showToast({message:"Hotel updated successfully",type:'SUCCESS'})
      },

      onError:async()=>{
        showToast({message:'Some error occured in updating hotel',type:'ERROR'})
      }
    })

    const handleSave=(hotelFormData:FormData)=>{
        mutate(hotelFormData)
    }

  return (
    <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading} />
  ) 
  
}

export default EditHotel