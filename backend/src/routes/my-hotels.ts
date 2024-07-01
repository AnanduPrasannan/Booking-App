import express,{Request,Response} from "express";
import multer from 'multer'
import cloudinary from 'cloudinary'
import Hotel, { HotelType } from "../model/hotel";

import verifyToken from "../middleware/auth";
import { body } from "express-validator";


const router=express.Router()

const storage=multer.memoryStorage()

const upload=multer({
    storage:storage,
    limits:{
        fileSize:10*1024*1024 // 10MB
    }
})

// api/my-hotels
router.post('/',verifyToken,[
    body('name').notEmpty().withMessage('Name is required'),
    body('city').notEmpty().withMessage('city is required'),
    body('country').notEmpty().withMessage('Country is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('type').notEmpty().withMessage('hotel Type is required'),
    body('pricePerNight').notEmpty().isNumeric().withMessage('Hotel price is required'),
    body('facility').notEmpty().isArray().withMessage('Facilities are  required'),

], upload.array("imageFiles",6), async (req:Request,res:Response)=>{


try{
const imageFiles=req.files as Express.Multer.File[]
const newHotel:HotelType=req.body



// 1 . upload files to cloudinary

    const imageUrls = await uploadImages(imageFiles);
// 2 . if upload successful, add URL to newHotel object

newHotel.imageUrls=imageUrls
newHotel.userId=req.userId
newHotel.lastUpdated=new Date()


// 3 . save the new hotel in our database

const hotel=new Hotel(newHotel)
await hotel.save()

// 4. return 201 status

return res.status(201).send(hotel)

}

catch(error){
        console.log(error)
}

})

// for editing my added hotels, click on my hotels you will get it

router.get('/',verifyToken,async(req:Request,res:Response)=>{

    
    try{
        const hotels=await Hotel.find({userId:req.userId})
        res.json(hotels)


    }
    catch(error){

        console.log(error)
        res.status(500).json({message:"Error fetching details"})
    }
})

router.get('/:id',verifyToken,async(req:Request,res:Response)=>{

    // api/hotels/64746
    const id=req.params.id.toString()

    try{

        const hotel=await Hotel.findOne({_id:id,
            userId:req.userId
        })
        res.json(hotel)
    }
    catch(error){
        res.status(500).json({message:"Something went wrong"})
    }

})


router.put('/:hotelId',verifyToken,upload.array('imageFiles'),async (req:Request,res:Response)=>{

    try{

        const updatedHotel:HotelType=req.body
        updatedHotel.lastUpdated=new Date()

        const hotel=await Hotel.findOneAndUpdate({
            _id:req.params.hotelId,
            userId:req.userId,

        },updatedHotel,{new:true})

        if(!hotel){
         return   res.status(404).json({message:"HOtel not found"})
        }
 
       // dealing with file uploads

       const files=req.files as Express.Multer.File[]
       const updatedImageUrls=await uploadImages(files)

       hotel.imageUrls=[...updatedImageUrls,...(updatedHotel.imageUrls || [])]

       await hotel.save()
        res.status(201).json(hotel)
    }

    catch(error){
        console.log(error)
        res.status(500).json({ message: "Something went throw" });
    }

})


async function uploadImages(imageFiles: Express.Multer.File[]) {
    const uploadPromises = imageFiles.map(async (image) => {
        
        const b64 = Buffer.from(image.buffer).toString("base64"); // converted to base 64 string
        let dataURI = "data:" + image.mimetype + ";base64," + b64; // telling cloudinary what type of image is this like .png, jpeg
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
        
        
        });
        
        
        const imageUrls = await Promise.all(uploadPromises);
        return imageUrls;
        }
    export default router
