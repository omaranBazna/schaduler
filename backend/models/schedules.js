
const sqlite3 = require('sqlite3');

// Create a new SQLite3 database instance
const db = new sqlite3.Database("./database/database.db");





function addSchedule(req,res){
  
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
        if(rows.length===0) return res.send("No title found 404")
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
function uploadSchedule(req, res) {
    const { schedule ,name} = req.body;
  
    if (!Array.isArray(schedule)) {
      return res.status(400).send("Invalid schedule data");
    }
  
    db.serialize(() => {
      // Insert into schedule table
      const query1 = "INSERT INTO schedules (name) VALUES (?)";
      db.run(query1,[name], function (err) {
        if (err) {
          console.error("Error inserting into schedule table:", err);
          return res.status(500).send("Database error");
        }
  
        const scheduleId = this.lastID;
  
        // Prepare statement for inserting events
        const stmt = db.prepare("INSERT INTO events (professor_id, course_id, major, year, semester, type, startDate, endDate, day, schedule_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
  
        for (let event of schedule) {
          stmt.run(
            [event.professor_id, event.course_id, event.major, event.year, event.semester, event.type, event.startDate, event.endDate, event.day, scheduleId],
            function (err) {
              if (err) {
                console.error("Error inserting into events table:", err);
              }
            }
          );
        }
  
        stmt.finalize((err) => {
          if (err) {
            console.error("Error finalizing statement:", err);
            return res.status(500).send("Database error");
          }
  
          res.send("done");
        });
      });
    });
  }
  
module.exports={
   addSchedule,getSchedules,getScheduleTitle,deleteSchedule,uploadSchedule
}