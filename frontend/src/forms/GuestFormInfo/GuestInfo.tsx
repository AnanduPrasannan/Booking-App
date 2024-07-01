import { useForm } from "react-hook-form"
import DatePicker from "react-datepicker"
import { useSearchContext } from "../../contexts/SearchContext"
import { useAppContext } from "../../contexts/Appcontext"
import { useLocation, useNavigate } from "react-router-dom"

type Props={
    hotelId:string,
    pricePerNight:number
}

type GuestInfoFormData={

  checkIn:Date,
  checkOut:Date,
  adultCount:number,
  childCount:number
}

const GuestInfo = ({hotelId,pricePerNight}:Props) => {

  const search=useSearchContext()
  const {isLoggedIn}=useAppContext()
  const navigate=useNavigate()
  const location=useLocation()

 const {watch,register,handleSubmit,setValue,formState:{errors}}=useForm<GuestInfoFormData>(
  {
    defaultValues: {
        checkIn:search.checkIn,
        checkOut:search.checkOut,
        adultCount:search.adultCount,
        childCount:search.childCount
    },
  }
 )

 const checkIn=watch('checkIn')
 const checkOut=watch('checkOut')

 const minDate=new Date()
 const maxDate=new Date()

 maxDate.setFullYear(maxDate.getFullYear()+1)

 const onSignInClick=(data:GuestInfoFormData)=>{

  search.saveSearchValues(
    "",
    data.checkIn,
    data.checkOut,
    data.adultCount,
    data.childCount)
    navigate('/sign-in',{state:{from:location}})
 }
 const onSubmit=(data:GuestInfoFormData)=>{

  search.saveSearchValues(
    "",
    data.checkIn,
    data.checkOut,
    data.adultCount,
    data.childCount)
    navigate(`/hotel/${hotelId}/booking`)
 }
  return (

    <div className="flex flex-col p-4 bg-blue-200 gap-4">
      <h3 className="font-bold text-xl">${pricePerNight}</h3>

      <form action="" onSubmit={isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)}>
        <div className="grid grid-cols-1 items-center gap-4">

          <div>
          <DatePicker selected={checkIn} onChange={(date)=>setValue('checkIn',date as Date)} 
                    required
                    selectsStart 
                    startDate={checkIn} 
                    endDate={checkOut}
                    minDate={minDate}
                    maxDate={maxDate}
                    placeholderText="Check-in-date" 
                    className="p-2 focus:outline-none min-w-full"/>
          </div>

          <div>
          <DatePicker selected={checkOut} onChange={(date)=>setValue('checkOut',date as Date)} 
                    selectsStart 
                    startDate={checkIn} 
                    endDate={checkOut}
                    minDate={minDate}
                    maxDate={maxDate}
                    placeholderText="Check-out-date" 
                    className="p-2 focus:outline-none min-w-full"/>
          </div>

          <div className=" flex bg-white px-2 py-1 items-center gap-2">
                    <label htmlFor=""className="flex items-center " >
                        Adults:
                        <input className="w-full p-1 focus:outline-none" type="number" min={1} {...register('adultCount',{

                            required:"This field is required",
                            min:{
                              value:1,
                              message:"There must be atleast 1 adult"
                            },
                            valueAsNumber:true

                        })} />
                    </label>
                    <label htmlFor="" className="flex items-center">
                        Children:
                        <input className="w-full p-1 focus:outline-none" type="number" min={0} {...register('childCount',{

                      valueAsNumber:true

                        })} />

                    </label>

                    {errors.adultCount && (
                      <span className="text-red-500 font-semibold ">{errors.adultCount.message}</span>
                    )}

                </div>
                    {isLoggedIn? (<button className="font-bold text-xl bg-blue-500 p-2 hover:bg-blue-400 text-white">Book Now</button>):(<button className="font-bold text-xl bg-blue-500 p-2 hover:bg-blue-400 text-white">Sign in for Booking</button>)}
        </div>
      </form>
    </div>
  )
}

export default GuestInfo