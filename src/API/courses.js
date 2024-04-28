import axios from "axios";
const serverlURL="http://localhost:8080"

export const addCourse=async(course_name, course_major, course_years, course_semesters, has_lab, course_type, course_notes)=>{
    try{
        await axios.post(serverlURL+"/courses",{
            course_name
            , course_major
            , course_years
            , course_semesters
            , has_lab
            , course_type
            , course_notes
        })  


    }catch(err){

    }
}

