import axios from "axios";
const serverlURL="http://localhost:8080"
//const serverlURL="https://schaduler.onrender.com"


export const addAvailabilities=async(availabilities,id)=>{
    try{
        console.log(availabilities)
        availabilities=availabilities.map(ava=>{
            return {...ava,
                fTime:ava.time.format("HH:mm"),
                professor_id:id.id
            }
        })
       await axios.post(serverlURL+"/availabilities",{
        availabilities
       })
    }catch(err){
     
    }
}