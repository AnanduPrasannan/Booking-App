import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"



const ImagesSection = () => {
  const {register,watch,setValue,formState:{errors}}=useFormContext<HotelFormData>()

  const existingImageUrls=watch('imageUrls')

  const handleDelete=(event:React.MouseEvent<HTMLButtonElement,MouseEvent>,imageUrl:string)=>{

    event.preventDefault()

    setValue('imageUrls',existingImageUrls.filter((url)=>
      url!==imageUrl
    ))

  }
  return (
    <div>
        <h1 className="font-bold text-2xl mb-3">Images</h1>

       <div className="flex flex-col">
        {existingImageUrls && (
          <div className="grid grid-cols-6">
              {existingImageUrls.map((url)=>(
                <div className="relative group">
                  <img src={url} className="object-cover min-h-full"
                  />
                  <button onClick={(event)=>handleDelete(event,url)} className="absolute inset-0 opacity-0 bg-opacity-50 group-hover:opacity-100 text-white ">Delete</button>
                </div>
                      ))}
          </div>
        )}
        <input type="file" multiple accept="image/*" {...register('imageFiles',{validate:(imageFiles)=>{
            const totalLength=imageFiles.length + (existingImageUrls?.length || 0)
            if(totalLength===0){
              return "Atleast one image should be added"
            }
            if(totalLength>6){
              return 'You have reached the maximum level'
            }
          
        }
        })} />
       
       </div>
       <span className="text-red-500 font-normal">

       {errors.imageFiles?.message}
       </span>
    </div>
  )
}

export default ImagesSection