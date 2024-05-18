const router=require("express").Router()
const Modal=require("../models/courses")
router.get("/",Modal.getCourses)

router.get("/list",Modal.getCoursesList)
router.get("/:id",Modal.getCourse);
router.post("/",Modal.addCourse)
router.delete("/:id",Modal.deleteCourse)
module.exports=router