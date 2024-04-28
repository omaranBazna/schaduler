const router=require("express").Router()
const Modal=require("../models/courses")
router.get("/",Modal.getCourses)
router.get("/list",Modal.getCoursesList)
router.post("/",Modal.addCourse)

module.exports=router