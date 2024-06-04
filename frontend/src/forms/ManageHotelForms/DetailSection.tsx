import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"


const DetailSection=()=>{

    const {register,formState:{errors}}=useFormContext<HotelFormData>()

    return(
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Add Hotel</h1>

            <label htmlFor="" className="text-black font-bold text-sm max-w-[50%]">
            Name
            <input className="border rounded  w-full" type="text" {...register('name',{required:"this field is required"})} />
                 <span className="text-red-500 font-mono">{errors.name?.message}</span>
        </label>

        <div className="flex gap-4">
        <label htmlFor="" className="text-black font-bold text-sm">
            City
            <input className="border rounded  w-full" type="text" {...register('city',{required:"this field is required"})} />
                 <span className="text-red-500 font-mono">{errors.city?.message}</span>
        </label>

        <label htmlFor="" className="text-black font-bold text-sm">
            Country
            <input className="border rounded  w-full" type="text" {...register('country',{required:"this field is required"})} />
                 <span className="text-red-500 font-mono">{errors.country?.message}</span>
        </label>
        </div>

        <label htmlFor="" className="text-black font-bold text-sm">
            Description
            <textarea className="border rounded  w-full" rows={10} {...register('description',{required:"this field is required"})} />
                 <span className="text-red-500 font-mono">{errors.description?.message}</span>
        </label>

        <label htmlFor="" className="text-black font-bold text-sm max-w-[50%]">
            Price Per Night
            <input className="border rounded  w-full" type="number" min={1}{...register('pricePerNight',{required:"this field is required"})} />
                 <span className="text-red-500 font-mono">{errors.pricePerNight?.message}</span>
        </label>
        <label htmlFor="" className="text-black font-bold text-sm max-w-[50%]">
            Star Rating
            <select {...register('starRating',{required:true})} className="w-full p-2 text-gray-700 font-normal">
                <option value="" className="text-sm">Select Rating</option>
                {[1,2,3,4,5].map((num)=>(

                <option value={num}>{num}</option>
                ))}
            </select>
                 <span className="text-red-500 font-mono">{errors.starRating?.message}</span>
        </label>
        </div>
    )
}

export default DetailSection