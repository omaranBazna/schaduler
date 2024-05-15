const router=require("express").Router()
const Modal=require("../models/schedules")
router.get("/",Modal.getSchedules)
router.post("/",Modal.addSchedule)
router.get("/title/:id",Modal.getScheduleTitle)
router.delete("/:id",Modal.deleteSchedule)
router.post("/upload",Modal.uploadSchedule)
module.exports=router