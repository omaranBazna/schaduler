
const sqlite3 = require('sqlite3');

// Create a new SQLite3 database instance
const db = new sqlite3.Database("./database/database.db");

/*
course_name TEXT,
    course_code TEXT,
    course_majors TEXT,
    course_years TEXT,
    course_semesters TEXT,
    has_lab INTEGER,
    course_type INTEGER,
    course_notes TEXT
    */


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

    const query="select * from course"
    db.all(query,(err,rows)=>{
        if(err){
            return res.send(err)
        }
        res.send(rows)
    })

}



module.exports={
    addCourse,
    getCourses
}