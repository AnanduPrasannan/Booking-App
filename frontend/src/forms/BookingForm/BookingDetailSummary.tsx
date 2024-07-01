import { HotelType } from "../../../../backend/src/model/hotel"

type Props= {
    checkIn:Date,
    checkOut:Date,
    adultCount:number,
    childCount:number,
    numberOfNights:number,
    hotel:HotelType
}

const BookingDetailSummary = ({checkIn,checkOut,adultCount,childCount,numberOfNights,hotel}:Props) => {

  return (

    <div className="grid rounded-lg border border-slate-300 p-5 gap-4 ">

        <h3 className="font-bold text-xl">Your Booking Details</h3>

        <div className="">
            Location:
            <div className="font-bold ">{`${hotel.name},${hotel.city},${hotel.country}`}</div>
        </div>
        <div className="flex justify-between">
           <div>
            Check-In
            <div className="font-bold">
                {checkIn.toDateString()}
            </div>
           </div>
           <div>
            Check-Out
            <div className="font-bold">
                {checkOut.toDateString()}
            </div>
           </div>

          
        </div>
        <div className="border-t border-b py-2">
            Total Length Stayed:
            <div className="font-bold">
                {numberOfNights} Nights
            </div>
           </div>
        <div className="border-t border-b py-2">
            Guest:
            <div className="font-bold">
                {adultCount} adults & {childCount} children 
            </div>
           </div>
   
    </div>
  )
}

export default BookingDetailSummary