

const sqlite3 = require('sqlite3');

// Create a new SQLite3 database instance
const db = new sqlite3.Database("./database/database.db");

const addAvailabilities=(req,res)=>{
  const {availabilities} =req.body
  
  db.serialize(async()=>{
    try{
     for(let availability of availabilities){
        console.log(availability)
       let {professor_id,fTime,duration,day}=availability
         fTime=fTime.split(":")
        await new Promise((resolve,reject)=>{
            let query="insert into availabilities (day,hours,minutes,duration, professor_id) values (?,?,?,?,?);"   
            db.run(query,[day,fTime[0],fTime[1],duration,professor_id],(err)=>{
              if(err){
                return reject(err)
              }
              resolve("Done")
            
            })

        })

     }
     res.send("done")
    }catch(err){
        console.log(err)
    
    }
  })

}

const getAvailabilities=(req,res)=>{

}
module.exports={
    addAvailabilities,getAvailabilities
}