const router=require("express").Router()
const Modal=require("../models/availabilities")
router.post("/",Modal.addAvailabilities)
router.get("/:id",Modal.getAvailabilities)
module.exports=router