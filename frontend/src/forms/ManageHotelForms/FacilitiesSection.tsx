import { useFormContext } from 'react-hook-form'
import { hotelFacilities } from "../../config/Hotel-options-config"
import { HotelFormData } from './ManageHotelForm'

const FacilitiesSection = () => {
    const {register,formState:{errors}}=useFormContext<HotelFormData>()
  return (
    <div>
        <h1 className="text-2xl font-bold mb-3">Facilities</h1>
        <div className="grid grid-cols-5 gap-3">
            {hotelFacilities.map((facilities)=>(
                <label htmlFor="" className='text-sm text-gray-500 gap-1'>
                    <input type="checkbox"  value={facilities}  {...register('facilities',{
                        validate:(facilities)=>{
                                if(facilities.length >0){
                                    return true
                                }
                                else{
                                    return "Please select any of the field "
                                }
                        }
                    })} />
                    {facilities}
                </label>
            ))}
        </div>
        { <span className='text-red-500 font-normal'>{errors.facilities?.message}</span>}

    </div>
  )
}

export default FacilitiesSection