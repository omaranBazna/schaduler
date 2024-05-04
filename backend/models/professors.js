
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
   console.log(req.body.professor_courses)
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
        
        res.send(err)
    } else {
       res.send("Course professor")
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

module.exports={
    addProfessor,getProfessors
}