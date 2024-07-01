import { useQuery } from "react-query"
import * as apiClient from '../api-clients'
const MyBookings = () => {

    const {data:hotels}=useQuery("fetchMyBookings",apiClient.fetchMyBookings)

    if(!hotels || hotels.length===0){
        return(
            <span>No Bookings Found</span>
        )
    }
  return (
    <div className="space-y-5">
        <h1 className="font-bold text-3xl">My Bookings</h1>
        {hotels.map((hotel)=>(
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-4 gap-4">
                <div className="lg:w-full lg:h-[250px]">
                    <img src={hotel.imageUrls[0]} alt="No image found" className="w-full h-full object-cover object-center"/>
                </div>
                <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
                <div className="text-2xl font-bold ">
                    {hotel.name}
                    <div className="text-xs">
                        {hotel.city},{hotel.country}
                    </div>
                </div>
                {hotel.bookings.map((booking)=>(
                    <div>
                        <div>
                            <span className="font-bold mr-2 ">
                                Dates:
                            </span>
                            <span>
                                {new Date(booking.checkIn).toDateString()}-
                                {new Date(booking.checkOut).toDateString()}
                                
                            </span>
                        </div>
                        <div>
                            <span className="font-bold mr-2">
                                Guests:
                            </span>
                            <span>
                                {booking.adultCount} adults,
                                {booking.childCount} children
                            </span>
                        </div>
                    </div>
                ))}
                </div>
               
            </div>

        ))}
    </div>
  )
}

export default MyBookings