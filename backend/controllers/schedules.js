const router=require("express").Router()
const Modal=require("../models/schedules")
router.get("/",Modal.getSchedules)
router.post("/",Modal.addSchedule)

module.exports=router