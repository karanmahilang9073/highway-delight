import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import 'dotenv/config'
import experienceRoutes from './routes/experienceRoutes.js'
import booking from './routes/bookingRoutes.js'
import promo from './routes/promoRoutes.js'

const app = express()
const PORT = 5000

//middlewares
app.use(cors()) 
app.use(express.json())

//db connection 
mongoose.connect(process.env.DB_URI)
    .then(()=>{
        console.log("database connected successfully...✅")
    })
    .catch((err)=>{
        console.log("database connection failed...❌",err)
    })

app.get('/',(req,res)=>{
    res.send("hello i am doing internship assignment")
})

//routes defining
app.use('/experiences', experienceRoutes)
app.use('/bookings',booking)
app.use('/promo',promo)

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})