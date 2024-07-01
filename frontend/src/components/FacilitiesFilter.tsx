import { hotelFacilities } from "../config/Hotel-options-config"

type Props={

  selectedFacilities:string[],
  onChange:(event:React.ChangeEvent<HTMLInputElement>)=>void
}

const FacilitiesFilter = ({selectedFacilities,onChange}:Props) => {
  return (
    <div className="border-b border-slate-300 pb-4">
        <h4 className="font-bold text-xl mb-2">Facilities</h4>
        {hotelFacilities.map((hotelFacility)=>(

        <label htmlFor="" className="flex items-center">
          <input type="checkbox" onChange={onChange} value={hotelFacility} checked={selectedFacilities.includes(hotelFacility)} />
          <span>{hotelFacility}</span>
        </label>
        ))}
    </div>
  )
}

export default FacilitiesFilter