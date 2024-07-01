
type Props={
    selectedStars:string[],
    onChange:(event:React.ChangeEvent<HTMLInputElement>)=>void
}


const StarRating = ({selectedStars,onChange}:Props) => {
  return (
    <div className="border-b border-slate-300 pb-4 ">
           
            <div>
                <h4 className="text-xl font-bold mb-2">Property Rating</h4>
                {['5','4','3','2','1'].map((star)=>(
                   <label htmlFor="" className="flex items-center">
                    <input type="checkbox" value={star}  checked={selectedStars.includes(star)} onChange={onChange} />
                    <span>{star} Star</span>
                   </label>
                ))}
               
            </div>
    </div>
  )
}

export default StarRating