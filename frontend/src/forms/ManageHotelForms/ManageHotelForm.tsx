import { FormProvider, useForm } from "react-hook-form"
import DetailSection from "./DetailSection"
import Typesection from "./Typesection"
import FacilitiesSection from "./FacilitiesSection"
import GuestSection from "./GuestSection"
import ImagesSection from "./ImagesSection"
import { HotelType } from "../../../../backend/src/model/hotel"
import { useEffect } from "react"


export type HotelFormData={
    name:string,
    city:string,
    country:string,
    description:string,
    type:string,
    pricePerNight:number,
    starRating:number,
    facilities:string[],
    imageFiles:FileList,
    imageUrls:string[],
    adultCount:number,
    childCount:number
}

type Props={
  hotel?:HotelType
  onSave:(hotelFormData:FormData)=>void 
  isLoading:boolean
}

const ManageHotelForm = ({onSave,isLoading,hotel}:Props) => {

    const formMethods=useForm<HotelFormData>()
    const {handleSubmit,reset}=formMethods

    useEffect(()=>{
      reset(hotel)
    },[hotel,reset])

    const onSubmit=handleSubmit((formDataJson:HotelFormData)=>{
        // create  a new formdata object & call our api
        console.log(formDataJson)

        const formData=new FormData()

        if(hotel){
          formData.append('hotelId',hotel._id)
        }

        formData.append('name',formDataJson.name)
        formData.append('city',formDataJson.city)
        formData.append('country',formDataJson.country)
        formData.append('description',formDataJson.description)
        formData.append('pricePerNight',formDataJson.pricePerNight.toString())
        formData.append('type',formDataJson.type)
        formData.append('starRating',formDataJson.starRating.toString())
        formData.append('adultCount',formDataJson.adultCount.toString())
        formData.append('childCount',formDataJson.childCount.toString())

        formDataJson.facilities.forEach((facility,index)=>{
          formData.append(`facilities[${index}]`,facility)
        })

        if(formDataJson.imageUrls){
          formDataJson.imageUrls.forEach((url,index)=>{
            formData.append(`imageUrls[${index}]`,url)
          })
        }

       Array.from(formDataJson.imageFiles).forEach((imageFile)=>{
         formData.append('imageFiles',imageFile)
       })
        onSave(formData)
    })

  return (
    <FormProvider {...formMethods}>

    <form action="" className="flex flex-col gap-10" onSubmit={onSubmit}>
      
        <DetailSection/>
        <Typesection/>
        <FacilitiesSection/>
        <GuestSection/>
       <ImagesSection/>
        <span>
          <button disabled={isLoading} type="submit" className="bg-blue-700 font-semibold rounded-md text-white p-2 disabled:bg-gray-400">{isLoading?'Saving..':'Save'}</button>
        </span>

    </form>

    </FormProvider>
  )
}

export default ManageHotelForm