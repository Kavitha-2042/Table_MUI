import dotenv from "dotenv"
dotenv.config()
import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import cors from "cors"
import movieRoute from "./Router/movieRoute"

const app:express.Application = express()

app.use(cors({
    credentials:true,
    origin:process.env.REACT_URL as string,
    methods:["GET","POST"]
}))

app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use('/movies',movieRoute)

mongoose.connect(process.env.MONGOOSE_URL as string,()=>{
    console.log("DB Connected")
    app.listen(process.env.PORT_NUMBER as string,()=>{
        console.log(`Server runs on port ${process.env.PORT_NUMBER}`)
    })
})