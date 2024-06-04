import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import * as  apiClient from '../api-clients'
import { useAppContext } from "../contexts/Appcontext"
import { BsBuilding, BsMap } from "react-icons/bs"
import { BiHotel, BiMoney, BiStar } from "react-icons/bi"

const MyHotels = () => {
    const {showToast}=useAppContext()
    const {data:hotelData}=useQuery('fetchMyHotels',apiClient.fetchMyHotels,{
        onSuccess:async ()=>{
            showToast({message:"Hotel added",type:"SUCCESS"})
        },

        onError:async ()=>{
            showToast({message:"Got some problems",type:'ERROR'})
        }
    })
    if(!hotelData){
        return <span className="font-bold text-2xl" >No hotels found</span>
    }
  return (
    <div className="space-y-5">
        <span className="flex justify-between">
            <h1 className="text-3xl font-bold">My Hotels</h1>
            <Link to='/add-hotel' className="bg-blue-600 p-2 text-white rounded-md font-bold">Add Hotel</Link>
        </span>
        <div className="grid grid-cols-1 gap-8">
            {hotelData.map((hotel)=>(
                <div className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5">
                    <h2 className="text-2xl font-bold">{hotel.name} </h2>
                    <div className="whitespace-pre-line">{hotel.description} </div>
                    <div className="grid grid-cols-4">
                        <div className="border border-slate-300 rounded-md p-3 ">
                            <BsMap/>
                            {hotel.city},{hotel.country}
                        </div>
                        <div className="border border-slate-300 rounded-md p-3 ">
                            <BsBuilding/>
                            {hotel.type}
                        </div>
                        <div className="border border-slate-300 rounded-md p-3 ">
                            <BiMoney/>
                           $ {hotel.pricePerNight} per night
                        </div>
                        <div className="border border-slate-300 rounded-md p-3 ">
                            <BiHotel/>
                        {hotel.adultCount} adults, {hotel.childCount} children
                        </div>
                        <div className="border border-slate-300 rounded-md p-3 ">
                            <BiStar/>
                        {hotel.starRating}
                        </div>
                    </div>
                    <span className="flex justify-end">
                        <Link to={`/edit-hotel/${hotel._id}`} className="bg-blue-600 text-white p-2 rounded-md font-bold">View Details</Link>
                    </span>
                </div>
            ))}
        </div>
    </div>
  )
}

export default MyHotels