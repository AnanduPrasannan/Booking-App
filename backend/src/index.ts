import express,{Request,Response} from  'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'
import userRoutes from './routes/users'
import authRoutes from './routes/auth'
import cookieParser from 'cookie-parser'
 
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
.then(()=>{
    console.log("Connetced to database", process.env.MONGODB_CONNECTION_STRING as string)
})
const app=express()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:process.env.FRONTEND_URL,          // our server only accepts requests from this url
    credentials:true
}))

app.use('/api/auth',authRoutes)
app.use('/api/users',userRoutes)


app.listen(7000,()=>{
    console.log('server running on port 7000')
})