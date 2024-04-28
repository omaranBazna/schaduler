const router=require("express").Router()
const Modal=require("../models/courses")
router.get("/",Modal.getCourses)
router.post("/",Modal.addCourse)

module.exports=router