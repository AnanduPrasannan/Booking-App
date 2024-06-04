
import { useFormContext } from "react-hook-form"
import { hoteltypes } from "../../config/Hotel-options-config"
import { HotelFormData } from "./ManageHotelForm"




const Typesection = () => {

    const {register,watch,formState:{errors}}=useFormContext<HotelFormData>()
    const typeWatch=watch('type')
  return (
    <div>
        <h1 className="text-2xl mb-3 font-bold">Hotel Types</h1>
        <div className="grid grid-cols-5 gap-2">

        {hoteltypes.map((type)=>(
            <label htmlFor="" className={ typeWatch===type ?'cursor-pointer bg-blue-400 rounded-md px-2 py-2':'cursor-pointer bg-gray-300 rounded-md px-2 py-2'}>

                <input type="radio" value={type}  {...register('type',{required:"This field is required"})}  ></input>
                
                <span >{type}</span>
            </label>
        ))}
        </div>
        <span className="text-red-500 font-normal">{errors.type?.message}</span>
    </div>
  )
}

export default Typesection