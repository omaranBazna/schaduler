const router=require("express").Router()
const Modal=require("../models/events")
router.get("/",Modal.getEvents)
router.get("/:schedule",Modal.getEventsSchedule)
router.post("/",Modal.addEvents)
router.get("/professors/:id",Modal.getProfessorEvents)

module.exports=router