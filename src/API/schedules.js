import axios from "axios";
const serverlURL="http://localhost:8080"


export const getSchedules=async()=>{

    try{
      const {data}= await axios.get(serverlURL+"/schedules")
      return data
     }catch(err){
      console.log(err)
      return []
    }
}

export const addToSchedule=async(title)=>{
    try{
        console.log(title)
        await axios.post(serverlURL+"/schedules",{
            title
        })
    }catch(err){

    }
}