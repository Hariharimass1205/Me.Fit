import express from "express"
import cookieParser from 'cookie-parser';

const app = express()
app.use(express.json())
app.use(cookieParser())

app.get("/",(req,res)=>{
    res.send("jbabnij")
})

app.listen(5000,()=>{
    console.log(`server start at port 5000`)
}) 



