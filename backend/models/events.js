
const sqlite3 = require('sqlite3');

// Create a new SQLite3 database instance
const db = new sqlite3.Database("./database/database.db");





function addEvents(req,res){
const { events } =req.body
const {major,year,semester} = req.query
db.serialize(() => {


    for(let event of events){
        console.log(event);
    const insertQuery = `
    INSERT INTO events (professor_id ,
        course_id ,
        major ,
       year,
       semester ,
       type)
    VALUES (?, ?, ? , ?, ?, ?)
`;

// Execute the query with parameters
db.run(insertQuery, [event.professor_id,event.coures_id,major,year,semester,event.type], function(err) {
    if (err) {
        
        res.send([])
    } 
});


    }
 res.send("Course professor")
})

}
function getEvents(req,res){
    

  
        const query="select * from events"
    db.all(query,(err,rows)=>{
        if(err){
            return res.send([])
        }
        res.send(rows)
    })
     
}

module.exports={
    addEvents,getEvents
}