
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { useEffect,useState } from 'react';
import { getSchedules,addToSchedule, deleteSchedule } from '../API/schedules';
import { useNavigate } from 'react-router-dom';
import { getEventsSchedule } from '../API/events';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    background:"lightblue"
  }));

  
const Schedules=()=>{
  const [title,setTitle]=useState("")
  const [schedules,setSchedules]=useState([])
  const navigator=useNavigate();
  const loadSchedules=async()=>{
      const data=await getSchedules();
      setSchedules(data)
  }

  const handleSubmit=async()=>{

     await addToSchedule(title)
     loadSchedules()
  } 

  useEffect(()=>{
     loadSchedules();
  },[])


  const downloadJSON = (data, filename = 'data.json') => {
   const jsonString = JSON.stringify(data, null, 2);
   const blob = new Blob([jsonString], { type: 'application/json' });
   const url = URL.createObjectURL(blob);
   const link = document.createElement('a');
   link.href = url;
   link.download = filename;
   link.click();
   URL.revokeObjectURL(url); // Clean up URL.createObjectURL memory
 };

   return (
    <div>
     <Box component="form" sx={{ 
        p: 2, border: '1px dashed grey' 
        ,display:'flex',alignItems:"center",justifyContent:"center",
        gap:10
        
        }}
     
        >
     <h1>Create new schedule</h1>
     <TextField value={title} onChange={(e)=>{
        setTitle(e.target.value)
     }} id="outlined-basic" label="Schedule title" variant="outlined" />
     <Button onClick={handleSubmit} variant="contained" color="success">Create schedule</Button>
    </Box>

    <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
        {schedules&& schedules.map(item=>{
            return <Item>{item.name}  <Button
            onClick={()=>{
                     localStorage.setItem("schedules",null)
                     navigator("/schedule/"+item.id)
            }}
            
            variant='contained'> Open schedule</Button>
           <Button
           color="error"
           onClick={()=>{
            deleteSchedule(item.id)
            loadSchedules()

           }}
           
           > Delete schedule</Button>
           <Button variant='contained' color="info" onClick={async()=>{
           try{ 
                 const data= await getEventsSchedule(item.id)
                 let saved={schedule:data}
                 downloadJSON(saved,item.title)
           }catch{

           }
           }}>
            Download Schedule
           </Button>
            </Item>
        })}
        
        
      </Stack>
    </Box>
    </div>
   )
}

export default Schedules