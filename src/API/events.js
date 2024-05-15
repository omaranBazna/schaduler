
import axios from "axios";
const serverlURL="http://localhost:8080"
//const serverlURL="https://schaduler.onrender.com"




export const getEvents=async(major,year,semester,schedule)=>{

    let localSchedules=localStorage.getItem("schedules")
      
    if(localSchedules){
       let obj=JSON.parse(localSchedules)
       if(obj){
       let events= obj[schedule+" "+major+" "+year+" "+semester]
       console.log("loaded events")
       console.log(events)
       if(events){
        return events
       } 
    }

    }
    try{
     const {data}=await axios.get(serverlURL+"/events",{
        params:{
            major,year,semester,schedule
        }
     })
     if(localSchedules && JSON.parse(localSchedules)!=null){
        let obj=JSON.parse(localSchedules)
        obj[schedule+" "+major+" "+year+" "+semester]=data
        localStorage.setItem("schedules",JSON.stringify(obj))
     }else{ 
        let obj={}
        obj[schedule+" "+major+" "+year+" "+semester]=data
        localStorage.setItem("schedules",JSON.stringify(obj))
     }
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