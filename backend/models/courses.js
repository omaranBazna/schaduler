const sqlite3 = require('sqlite3').verbose();
// Create a new SQLite3 database instance
const db = new sqlite3.Database("../database/database.db");

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
    const {course_name,course_major,course_years,course_semesters,has_lab,course_type,course_notes}=req.body;

    const insertQuery = `
    INSERT INTO courses (course_name, course_major, course_years, course_semesters, has_lab, course_type, course_notes)
    VALUES (?, ?, ?, ?, ?, ?, ?)
`;

// Execute the query with parameters
db.run(insertQuery, [course_name, course_major, course_years, course_semesters, has_lab, course_type, course_notes], function(err) {
    if (err) {
        res.send(err)
    } else {
       res.send("Course added")
    }
});

}

function getCourses(req,res){

}



module.exports={
    addCourse,
    getCourses
}