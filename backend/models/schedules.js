
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

module.exports={
   addSchedule,getSchedules
}