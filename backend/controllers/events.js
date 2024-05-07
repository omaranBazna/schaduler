const router=require("express").Router()
const Modal=require("../models/events")
router.get("/",Modal.getEvents)
router.post("/",Modal.addEvents)

module.exports=router