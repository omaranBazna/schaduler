import { CompareSharp } from "@mui/icons-material";
import axios from "axios";
const serverlURL="http://localhost:8080"
//const serverlURL="https://schaduler.onrender.com"



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

export  const handleUpload = async (jsonData,name="uploaded") => {
    if(name==""){
        name=(new Date()).toString()
    }
    if (!jsonData) {
      alert("No JSON data to upload");
      return;
    }  

    
    let obj={
      schedule:jsonData,
    name:name
    }
  
    try {
      const response = await fetch(serverlURL+'/schedules/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
     
    } catch (error) {
      console.error("Error uploading JSON data:", error);
    }
  };
  