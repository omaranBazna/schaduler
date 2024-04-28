import axios from "axios";
const serverlURL="http://localhost:8080"

export const addCourse=async(course_name, course_code,course_majors, course_years, course_semesters, has_lab, course_type, course_notes)=>{
    try{
       
        await axios.post(serverlURL+"/courses",{
            course_name
            , course_code
            , course_years
            , course_semesters
            , has_lab
            , course_type
            , course_notes
            ,course_majors
        })  


    }catch(err){

    }
}
export const getCourses=async()=>{

    try{
      const {data}=await axios.get(serverlURL+"/courses")
      return data
    }catch(err){
      return []
    }
}


export const getCoursesList=async()=>{

  try{
    const {data}=await axios.get(serverlURL+"/courses/list")
    return data
  }catch(err){
    return []
  }
}