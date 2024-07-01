import { hoteltypes } from "../config/Hotel-options-config"

type Props={
    selectedTypes:string[]
    onChange:(event:React.ChangeEvent<HTMLInputElement>)=>void
}

const TypeSection = ({selectedTypes,onChange}:Props) => {

  return (
    <div className='border-b border-slate-300 pb-4'>
       
            <h3 className="font-bold text-xl mb-2 ">Type Section</h3>
            {hoteltypes.map((hoteltype)=>(

            <label htmlFor="" className="flex items-center space-x-2">
                <input type="checkbox" className='rounded' value={hoteltype}  checked={selectedTypes.includes(hoteltype)} onChange={onChange} />
                <span>{hoteltype} </span>
            </label>
            ))}
        
    </div>
  )
}

export default TypeSection