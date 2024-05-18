import axios from "axios";
const serverlURL="http://localhost:8080"
//const serverlURL="https://schaduler.onrender.com"



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
export const getCourses=async(all=true,params)=>{

    try{
      const {data}=await axios.get(serverlURL+"/courses/", { params:{...params,all} })
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

export const getCourseDetails=async(course_id)=>{
  try{
       let {data}=await axios.get(serverlURL+"/courses/"+course_id)
       console.log(data)
       return data[0]
  }catch(err){
    return "Wrong loading"
  }
}
export const deleteCourse=async(course_id)=>{
  try{
    await axios.delete(serverlURL+"/courses/"+course_id)

  }catch{
    
  }
}

