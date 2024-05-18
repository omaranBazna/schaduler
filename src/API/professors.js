import axios from "axios";
const serverlURL="http://localhost:8080"
//const serverlURL="https://schaduler.onrender.com"




export const addProfessor=async(professor_name,
    professor_major ,
    professor_courses ,
    availabilities ,
    professor_type ,
    professor_notes)=>{
    try{
    const {data}= await axios.post(serverlURL+"/professors",{
        professor_name: professor_name+" "+professor_major,
        professor_major:"" ,
        professor_courses ,
        availabilities ,
        professor_type ,
        professor_notes
     })
     return data
    }catch(err){
     throw new Error("");
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


export const getProfessorDetails=async(prof_id)=>{
  try{
       let {data}=await axios.get(serverlURL+"/professors/"+prof_id)
       return data[0]
  }catch(err){
    return "Wrong loading"
  }
}