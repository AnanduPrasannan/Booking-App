import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"



const ImagesSection = () => {
  const {register,formState:{errors}}=useFormContext<HotelFormData>()
  return (
    <div>
        <h1 className="font-bold text-2xl mb-3">Images</h1>

       <div className="flex flex-col">
        <input type="file" multiple accept="image/*" {...register('imageFiles',{validate:(imageFiles)=>{
            const totalLength=imageFiles.length
            if(totalLength===0){
              return "Atleast one image should be added"
            }
            if(totalLength>6){
              return 'You have reached the maximum level'
            }
        }})} />
       
       </div>
       <span className="text-red-500 font-normal">

       {errors.imageFiles?.message}
       </span>
    </div>
  )
}

export default ImagesSection