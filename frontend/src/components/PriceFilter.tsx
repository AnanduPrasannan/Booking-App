
type Props={
    selectedPrice?:number,
    onChange:(value?:number)=>void
}


const PriceFilter = ({selectedPrice,onChange}:Props) => {
  return (
    <div>
        <h3 className="text-xl font-bold mb-2">Max Price</h3>
        <select name="" id="" value={selectedPrice} className='p-2 border rounded-md w-full' onChange={(event)=>onChange(event.target.value ? parseInt(event.target.value):undefined)}>
        <option value="">Select Max Price</option>
        {[200,400,600,800,1000].map((price)=>(
            <option value="">{price}</option>
        ))}
        </select>
    </div>
  )
}

export default PriceFilter