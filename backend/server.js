const express=require("express")
const app=express()

app.use(require("body-parser")())
app.use(require("cors")())
app.use(express.urlencoded({ extended: false }))
app.post("/auth",(req,res)=>{
    const {email,password}=req.body
  
    if(email=="admin" && password=="admin"){
        return res.send({accepted:true})
    }else{
        return res.send({accepted:false})
    }
})
app.use("/courses",require("../backend/controllers/courses"))
app.use("/professors",require("../backend/controllers/professors"))
app.use("/schedules",require("../backend/controllers/schedules"))
app.use("/events",require("../backend/controllers/events"))
app.use("/availabilities",require("../backend/controllers/availabilities"))


app.listen(8080,()=>{
    console.log("http://localhost:8080")
})
