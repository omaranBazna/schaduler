
const sqlite3 = require('sqlite3');

// Create a new SQLite3 database instance
const db = new sqlite3.Database("./database/database.db");


function addProfessor(req,res){
const { professor_name,
    professor_major ,
    professor_courses ,
    availabilities ,
    professor_type ,
    professor_notes } =req.body
   
    const insertQuery = `
    INSERT INTO Professors (professor_name,
        professor_major ,
        professor_courses ,
        availabilities ,
        professor_type ,
        professor_notes)
    VALUES (?, ?, ? , ?, ?, ?)
`;

// Execute the query with parameters
db.run(insertQuery, [professor_name,
    professor_major ,
    professor_courses.join("-"),
    "" ,
    professor_type ,
    professor_notes], function(err) {
    if (err) {
        
        res.send({id:"none"})
    } else {
       res.send({id:this.lastID})
    }
});

}
function getProfessors(req,res){
    

    if(req.query.all==="true"){
        const query="select * from professors"
    db.all(query,(err,rows)=>{
        if(err){
            return res.send(err)
        }
        res.send(rows)
    })
      }else{
          const {Course} = req.query
          
          const query="select * from professors";
          db.all(query,(err,rows)=>{
             
              if(err){
                console.log(err)
                  return res.send([])
              }
              rows=rows.filter(item=>{
                return item.professor_courses.split("-").includes(Course)
              })
              res.send(rows)
          })
      
      }
}


function getProfessor(req,res){
    let {id}=req.params
    let query="select * from  professors where id=(?)"
    db.all(query,[id],(err,rows)=>{
      if(err){
          return res.send([])
      }
      res.send(rows)
    })
  }
function removeProfessor(req,res){
    let {id}=req.params
    console.log(id)
    db.run("delete from Professors where id=?",[id],(err)=>{
        console.log(err)
        if(err){
           return res.status(501).end();
        }
        res.status(200).end();
    })
}
module.exports={
    addProfessor,getProfessors,getProfessor,removeProfessor
}