import axios from "axios";
const serverlURL="https://schaduler.onrender.com"


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

export const getScheduleTitle=async(id)=>{
    try{
     const {data}=  await axios.get(serverlURL+"/schedules/title/"+id)
     return data
    }catch(err){
        console.log(err)
        return ""
    }
}

export const deleteSchedule=async(id)=>{
    try{
      await axios.delete(serverlURL+"/schedules/"+id)

    }catch(err){
        console.log(err)
        throw new Error("Error")
    }
}