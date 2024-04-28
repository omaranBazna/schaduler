const express=require("express")
const app=express()

app.use(require("body-parser")())
app.use(require("cors")())
app.use(express.urlencoded({ extended: false }))

app.use("/courses",require("../backend/controllers/courses"))
app.use("/professors",require("../backend/controllers/professors"))


app.listen(8080,()=>{
    console.log("http://localhost:8080")
})
