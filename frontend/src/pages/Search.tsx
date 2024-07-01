import { useQuery } from "react-query"
import { useSearchContext } from "../contexts/SearchContext"
import * as apiClient from '../api-clients'
import { useState } from "react"
import SearchResultCard from "../components/SearchResultCard"
import Pagination from "../components/Pagination"
import StarRating from "../components/StarRating"
import TypeSection from "../components/TypeSection"
import FacilitiesFilter from "../components/FacilitiesFilter"
import PriceFilter from "../components/PriceFilter"

const Search=()=>{

    const search=useSearchContext()
    const[page,setPage]=useState<number>(1)
    const [selectedStars,setSelectedStars]=useState<string[]>([])
    const [selectedTypes,setSelectedTypes]=useState<string[]>([])
    const [selectedFacilities,setSelectedFacilities]=useState<string[]>([])
    const [selectedPrice,setSelectedPrice]=useState<number | undefined>()
    const [sortOption,setSortOption]=useState<string>('')

    const searchParams={
        destination:search.destination,
        checkIn:search.checkIn.toISOString(),
        checkOut:search.checkOut.toISOString(),
        adultCount:search.adultCount.toString(),
        childCount:search.childCount.toString(),
        page:page.toString(),
        stars:selectedStars,
        types:selectedTypes,
        facility:selectedFacilities,
        maxPrice:selectedPrice?.toString(),
        sortOption
    }

   const {data:hotelData}=useQuery(['searchHotels',searchParams],()=>apiClient.searchHotels(searchParams))

   const handleStarChange=(event:React.ChangeEvent<HTMLInputElement>)=>{

    const starRating=event.target.value

    setSelectedStars((prevStars)=>
    event.target.checked ? [...prevStars,starRating]:prevStars.filter((star)=>star!==starRating)
     )

    
   }

   const handleFacilityChange=(event:React.ChangeEvent<HTMLInputElement>)=>{

    const hotelFacilityType=event.target.value

    setSelectedFacilities((prevFacility)=>
    event.target.checked ? [...prevFacility,hotelFacilityType]: prevFacility.filter((facility)=>facility!==hotelFacilityType)
    )
   }

   const handleTypeChange=(event:React.ChangeEvent<HTMLInputElement>)=>{

    const hotelTypeSelect=event.target.value
    setSelectedTypes((prevTypes)=>
    event.target.checked ? [...prevTypes,hotelTypeSelect] : prevTypes.filter((selectedType)=>selectedType!==hotelTypeSelect)
    )
 }


    return(
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-4">
            <div className="rounded-lg border border-slate-300  h-fit sticky top-10 p-4">
                <div className="space-y-5">
                    <h2 className="font-bold text-xl border-b border-slate-300 pb-4">Filter By:</h2>

                    <StarRating onChange={handleStarChange} selectedStars={selectedStars}/>
                    <TypeSection onChange={handleTypeChange} selectedTypes={selectedTypes}/>
                    <FacilitiesFilter onChange={handleFacilityChange} selectedFacilities={selectedFacilities}/>
                    <PriceFilter selectedPrice={selectedPrice} onChange={(value?:number)=>setSelectedPrice(value)}/>
                    {/* Todo filters */}
                    
                </div>
            </div>
            <div className="flex flex-col gap-4">

                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">{hotelData?.pagination.total} hotels found 
                    {search.destination ?` in ${search.destination}`:" "}
                    </span>
                {/*Todo sort*/}
                <select name="" id="" value={sortOption} className='p-2 border rounded-md' onChange={(event)=>setSortOption(event.target.value)}>
                    <option value="">Sort By</option>
                    <option value="starRating">Star Rating</option>
                    <option value="pricePerNightAsc">Price Per Night(low to High)</option>
                    <option value="pricePerNightDesc">Price Per Night(High to low)</option>
                </select>
                </div>
                {hotelData?.data.map((hotel)=>(
                    <SearchResultCard hotel={hotel}/>
                ))}
                <div>
                    <Pagination page={hotelData?.pagination.page || 1} pages={hotelData?.pagination.pages || 1} onPageChange={(page)=>setPage(page)}/>
                </div>
            </div>
        </div>
    )
}

export default Search