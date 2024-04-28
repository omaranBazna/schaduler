import axios from "axios";
const serverlURL="http://localhost:8080"


export const addProfessor=async(professor_name,
    professor_major ,
    professor_courses ,
    availabilities ,
    professor_type ,
    professor_notes)=>{
    try{
     await axios.post(serverlURL+"/professors",{
        professor_name,
        professor_major ,
        professor_courses ,
        availabilities ,
        professor_type ,
        professor_notes
     })
    }catch(err){

    }
}