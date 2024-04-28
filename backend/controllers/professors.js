const router=require("express").Router()
const Modal=require("../models/professors")
router.get("/",Modal.getProfessors)
router.post("/",Modal.addProfessor)

module.exports=router