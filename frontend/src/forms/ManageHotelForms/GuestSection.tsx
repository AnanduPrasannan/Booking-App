import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"



const GuestSection = () => {
    const {register,formState:{errors}}=useFormContext<HotelFormData>()
  return (
    <div>
        <h1 className="font-bold text-2xl mb-3">Guests</h1>
        <div className="bg-gray-500 grid grid-cols-2 gap-5 p-3">

        <label htmlFor="" className="text-sm font-semibold ">
            Adults
            <input type="number" min={1} className="w-full rounded-md py-2 px-2" {...register('adultCount',{required:"This field is required"})} />
            <span className="text-red-500">{errors.adultCount?.message}</span>
        </label>

        <label htmlFor="" className="text-sm font-semibold">
            Children
            <input type="number" min={0} className="w-full rounded-md py-2 " {...register('childCount',{required:"This field is required"})} />
           <span className="text-red-500">{errors.childCount?.message}</span>
        </label>
        </div>
    </div>
  )
}

export default GuestSection