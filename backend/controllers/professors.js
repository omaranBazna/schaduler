const router=require("express").Router()
const Modal=require("../models/professors")
router.get("/",Modal.getProfessors)
router.post("/",Modal.addProfessor)
router.get("/:id",Modal.getProfessor)
module.exports=router