const sqlite3 = require('sqlite3');
// Create a new SQLite3 database instance
const db = new sqlite3.Database("./database/database.db");
function addEvents(req,res){
const { events } =req.body
const {major,year,semester,schedule} = req.query


db.serialize(() => {
let query= "delete from events where major=(?) and year=(?) and semester=(?) and schedule_id=(?)"

db.run(query,[major,year,semester,schedule])
    for(let event of events){
       
    const insertQuery = `
    INSERT INTO events (professor_id ,
        course_id ,
        major ,
       year,
       semester ,
       type,
       startDate ,
       endDate,
       day ,
    schedule_id)
    VALUES (?, ?, ? , ?, ?, ?,?,?,?,?)
`;
console.log(event.color)

// Execute the query with parameters
db.run(insertQuery, [event.event_professor.id,event.event_course.id,major,year,semester,JSON.stringify(event.color),event.selectedStart,event.selectedEnd,event.currentDay,schedule], function(err) {
    if (err) {
        
        console.log(err)
        return res.send("Error")
    } 
});


    }
 res.send("All events added")
})

}
function getEvents(req,res){
    const {major,year,semester,schedule} = req.query
    const query=`select * from events where major=(?) and year=(?) and semester=(?) and schedule_id=(?)`
   
   
    db.all(query,[major,year,semester,schedule],(err,rows)=>{
        if(err){
            return res.send([])
        }
        
        db.serialize(async () => {
            let result = [];
        
            for (let row of rows) {
                let professor = await new Promise((resolve, reject) => {
                    let query = "SELECT * FROM professors WHERE id = ?";
                    db.all(query, [row.professor_id], (err, professor) => {
                        if (err) reject(err);
                        else resolve(professor[0]);
                    });
                });
        
                let course = await new Promise((resolve, reject) => {
                    let query = "SELECT * FROM course WHERE id = ?";
                    db.all(query, [row.course_id], (err, course) => {
                        if (err) reject(err);
                        else resolve(course[0]);
                    });
                });
                row.color=JSON.parse(row.type)
                row.event_professor = professor;
                row.event_course = course;
                result.push(row);
            }
        
           
            res.send(result);
        });
        
    })
   
      
}
function getProfessorEvents(req,res){
    let id=req.params.id
    let {semester,schedule}=req.query
  let query="select * from events where semester=(?) and schedule_id=(?) and professor_id=(?)"

  db.all(query,[semester,schedule,id],(err,rows)=>{
    if(err){
        console.log(err)
        return res.send([])
    }
    res.send(rows)
  })
}
module.exports={
    addEvents,getEvents,getProfessorEvents
}