const sqlite3 = require('sqlite3');
// Create a new SQLite3 database instance
const db = new sqlite3.Database("./database/database.db");
function addEvents(req,res){
const { events } =req.body
const {major,year,semester,schedule} = req.query


db.serialize(() => {


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

// Execute the query with parameters
db.run(insertQuery, [event.event_professor.id,event.event_course.id,major,year,semester,event.color.value,event.selectedStart,event.selectedEnd,event.currentDay,schedule], function(err) {
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
        res.send(rows)
    })
     
}

module.exports={
    addEvents,getEvents
}