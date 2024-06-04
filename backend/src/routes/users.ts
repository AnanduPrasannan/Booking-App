import express,{Request,Response} from 'express'
import User from '../model/user'
import jwt from 'jsonwebtoken'
import {check,validationResult} from 'express-validator'



let router=express.Router()

    //register API

router.post('/register',[
    check("firstName","first name is required").isString(),
    check("lastName","last name is required").isString(),
    check("email","Email is required").isEmail(),
    check("password","Password lenght should be six or more").isLength({min:6}),
],async (req:Request,res:Response)=>{                                                       // i added any dont know why

    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({message:errors.array()})
    }


    try{
            let user=await User.findOne({
                email:req.body.email
            })

            if(user){

                return res.status(400).json({message:"Email already exist"})
            }

           user= new User(req.body)
           await user.save()
           const token=jwt.sign({userId:user.id},process.env.JWT_SECRET_KEY as string,{expiresIn:"1d"})    //why expires in and max age both used
           res.cookie("auth_token",token,{
                httpOnly:true,
                secure:process.env.NODE_ENV==='production',
                maxAge:86400000
           })
           return res.status(200).send({message:"registered successfully"})
    }
    catch(error){
            return res.status(500).send({message:"Something went wrong"})
    }
})

  

export default router