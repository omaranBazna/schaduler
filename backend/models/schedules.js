
const sqlite3 = require('sqlite3');

// Create a new SQLite3 database instance
const db = new sqlite3.Database("./database/database.db");





function addSchedule(req,res){
    console.log("request")
const { title} =req.body
 
    const insertQuery = `
    INSERT INTO Schedules (name)
    VALUES (?)
`;

// Execute the query with parameters
db.run(insertQuery, [title], function(err) {
    if (err) {
        
        res.send(err)
    } else {
       res.send("schedule created")
    }
});

}
function getSchedules(req,res){

        const query="select * from Schedules"
    db.all(query,(err,rows)=>{
        if(err){
            console.log(err)
            return res.send([])
        }
        res.send(rows)
    })
    
}

function getScheduleTitle(req,res){
    let {id}=req.params
    let query ="select * from schedules where id=(?)"
    db.all(query,[id],(err,rows)=>{
        if(err){
            console.log(err)
            return res.send("Missid title(Server error)")
        }
        res.send(rows[0].name)
    })
}
function deleteSchedule(req,res){
  const {id}=req.params;
  let query="delete from schedules where id=(?)"
  db.run(query,[id],(err)=>{
    if(err){
        console.log(err)
    }
    res.send("deleted")
  })
}
module.exports={
   addSchedule,getSchedules,getScheduleTitle,deleteSchedule
}