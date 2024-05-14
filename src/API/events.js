
import axios from "axios";
const serverlURL="https://schaduler.onrender.com"




export const getEvents=async(major,year,semester,schedule)=>{

    try{
     const {data}=await axios.get(serverlURL+"/events",{
        params:{
            major,year,semester,schedule
        }
     })
     return data;
    }catch(err){
        console.log(err)
        return []
    }

}

export const addEvents=async(major,year,semester,schedule,events)=>{

    try{
        await axios.post(serverlURL+"/events",{
            events
        },{
            params:{
                major,year,semester,schedule
            }
         })
    }catch(err){
        console.log(err)
    }
}

export const getProfessorsEvents=async(semester,schedule,professor_id)=>{
    try{
        let {data}=await axios.get(serverlURL+"/events/professors/"+professor_id,{
            params:{
                semester,schedule
            }
        })
        return data
    }catch(err){
        console.log(err)
        return []
    }
}