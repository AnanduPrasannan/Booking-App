let express=require('express')
let app=express()
let expressLayouts=require('express-ejs-layouts')

app.use(express.static('./public'))

app.use(expressLayouts)

// why app.set used what happens if not used
app.set('view engine', 'ejs')

app.set('layout','./layouts/full-page')



app.get('/',(req,res)=>{
    res.render('home.ejs')
})



app.listen(3000,()=>{
    console.log("you are listening to port 3000")
})