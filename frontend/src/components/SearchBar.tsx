import { FormEvent, useState } from "react"
import { useSearchContext } from "../contexts/SearchContext"
import {  MdTravelExplore } from "react-icons/md"
import   DatePicker  from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'
import { useNavigate } from "react-router-dom"


const SearchBar = () => {

    const navigate=useNavigate()
    const search=useSearchContext()

  

    const [destination,setDestination]=useState<string>(search.destination)
    const [checkIn,setCheckIn]=useState<Date>(search.checkIn)
    const [checkOut,setCheckOut]=useState<Date>(search.checkOut)
    const [adultCount,setAdultCount]=useState<number>(search.adultCount)
    const [childCount,setChildCount]=useState<number>(search.childCount)

    const handleSubmit=(event:FormEvent)=>{

        event.preventDefault()
        search.saveSearchValues(destination,checkIn,checkOut,adultCount,childCount)
        navigate("/search")
    }
    const minDate=new Date()
    const maxDate=new Date()
    maxDate.setFullYear(maxDate.getFullYear() + 1)
    return(
        <form action="" onSubmit={handleSubmit} className="-mt-8 p-3 bg-orange-400 rounded shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4">
                <div className="flex flex-row flex-1 items-center bg-white p-2 ">
                <MdTravelExplore size={25} className="mr-2"/>
                <input placeholder="Where are you going?" className="text-md w-full focus:outline-none" value={destination} onChange={(event)=>setDestination(event.target.value)}/>
                </div>

                <div className=" flex bg-white px-2 py-1 items-center gap-2">
                    <label htmlFor=""className="flex items-center" >
                        Adults:
                        <input className="w-full p-1 focus:outline-none" type="number" min={1} value={adultCount} onChange={(event)=>setAdultCount(parseInt(event.target.value))}/>
                    </label>
                    <label htmlFor="" className="flex items-center">
                        Children:
                        <input className="w-full p-1 focus:outline-none" type="number" min={0} value={childCount} onChange={(event)=>setChildCount(parseInt(event.target.value))}/>
                    </label>

                </div>

                <div>
                    <DatePicker selected={checkIn} onChange={(date)=>setCheckIn(date as Date)} 
                    selectsStart 
                    startDate={checkIn} 
                    endDate={checkOut}
                    minDate={minDate}
                    maxDate={maxDate}
                    placeholderText="Check-in-date" 
                    className="p-2 focus:outline-none min-w-full"/>
                    
                </div>

                <div>
                    <DatePicker selected={checkOut} onChange={(date)=>setCheckOut(date as Date)} 
                    selectsStart 
                    startDate={checkIn} 
                    endDate={checkOut}
                    minDate={minDate}
                    maxDate={maxDate}
                    placeholderText="Check-out-date" 
                    className="p-2 focus:outline-none min-w-full"/>
                    
                </div>

                <div className="flex gap-1">
                    <button className="bg-blue-600 hover:bg-blue-400 text-white font-bold text-xl p-2 w-2/3 h-full">Search</button>
                    <button className="bg-red-600 hover:bg-red-400 text-white font-bold text-xl p-2 w-1/3 h-full">Clear</button>
                </div>
        </form>
    )
}

export default SearchBar