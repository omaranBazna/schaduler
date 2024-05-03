
const sqlite3 = require('sqlite3');

// Create a new SQLite3 database instance
const db = new sqlite3.Database("./database/database.db");



function addCourse(req,res){

   const {course_name,course_code,course_majors,course_years,course_semesters,has_lab,course_type,course_notes}=req.body;
  
    const insertQuery = `
    INSERT INTO course (course_name, course_code, course_majors, course_years, course_semesters, has_lab, course_type, course_notes)
    VALUES (?, ?, ? , ?, ?, ?, ?, ?)
`;

// Execute the query with parameters
db.run(insertQuery, [course_name, course_code,course_majors.join("-"), course_years.join("-"), course_semesters.join("-"), has_lab, course_type, course_notes], function(err) {
    if (err) {
        console.log(err)
        res.send(err)
    } else {
       res.send("Course added")
    }
});

}

function getCourses(req,res){
   
    if(req.query.all==="true"){
      const query="select * from course"
      db.all(query,(err,rows)=>{
          if(err){
              return res.send(err)
          }
          res.send(rows)
      })
    }else{
        const {Year,Major,Semester} = req.query
        
        const query="select * from course where  course_majors LIKE (?) and course_years Like (?) and   course_semesters Like (?) ;";
        db.all(query,[Major,Year,Semester],(err,rows)=>{
            console.log(err)
            console.log(rows)
            if(err){
                return res.send(err)
            }
            res.send(rows)
        })
    
    }

}

function getCoursesList(req,res){

    const query="select  id,course_name,course_code  from course"
    db.all(query,(err,rows)=>{
        console.log(err)
        if(err){
            return res.send([])
        }
        res.send(rows)
    })

}



module.exports={
    addCourse,
    getCourses,
    getCoursesList
}