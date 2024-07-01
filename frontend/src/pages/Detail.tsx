import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import * as apiClient from '../api-clients'
import { AiFillStar } from "react-icons/ai"
import GuestInfo from "../forms/GuestFormInfo/GuestInfo"

const Detail = () => {

const {hotelId}=useParams()

const {data:hotel}=useQuery("fetchHotelById",()=>apiClient.fetchHotelById(hotelId || ''),{


    enabled:!!hotelId
})

if(!hotel){

    return 
   <></>
    
}

  return (
    <div className="space-y-6">
        <div>
            <span className="flex">
            {Array.from({length:hotel.starRating}).map(()=>(
                <AiFillStar className="fill-yellow-400"/>
            ))}
            </span>
            <h1 className="text-2xl font-bold">{hotel.name}</h1>
            
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {hotel.imageUrls.map((image)=>(
                <div className="h-[300px] ">

                    <img src={image} alt="image"className="rounded-md w-full h-full object-cover object-center "/>
                </div>

            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {hotel.facilities.map((facility)=>(
                <div className="border border-slate-300 p-2 rounded-md">{facility}</div>
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
            <div className="">

            {hotel.description}  
            </div>
            <div className="h-fit">
              <GuestInfo pricePerNight={hotel.pricePerNight} hotelId={hotel._id}/>
            </div> 
        </div>

    </div>
  )
}

export default Detail