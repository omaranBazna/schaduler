import axios from "axios";
//const serverlURL="http://localhost:8080"
const serverlURL="https://schaduler.onrender.com"




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
export const getProfessors=async(all=true,params)=>{

    try{
      const {data}=await axios.get(serverlURL+"/professors", { params:{...params,all} })
      return data
    }catch(err){
      return []
    }
}