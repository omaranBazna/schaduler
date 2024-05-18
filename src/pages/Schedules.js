
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { useEffect,useState } from 'react';
import { getSchedules,addToSchedule, deleteSchedule, handleUpload } from '../API/schedules';
import { useNavigate } from 'react-router-dom';
import { getEventsSchedule } from '../API/events';
import { exportToExcelWithStyling } from '../utils/saveExcel';
import DeleteForever from '@mui/icons-material/DeleteForever';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import EditIcon from '@mui/icons-material/Edit';
import {Modal} from '@mui/material';
import {Typography} from '@mui/material';
import toast,{Toaster} from 'react-hot-toast';
import UploadIcon from '@mui/icons-material/Upload';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    background:"lightblue"
  }));
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display:"flex",
    flexDirection:"column",
    gap:5
  };
  const BoxedIcon = styled(IconButton)(({ theme }) => ({
    width: '48px',  // Adjust width and height as needed
    height: '48px',
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '8px',  // Adjust border radius for rounded corners
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  }));  
const Schedules=()=>{
  const [title,setTitle]=useState("")
  const [schedules,setSchedules]=useState([])
  const [jsonData, setJsonData] = useState(null);
  const [sname,setSName]=useState("")
  const navigator=useNavigate();
  const [s_id,setSID]=useState("")
  const [open, setOpen] = useState(false);
  const [open2,setOpen2]=useState(false)
  const [open3,setOpen3]=useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const loadSchedules=async()=>{
      const data=await getSchedules();
      setSchedules(data)
  }

  const handleSubmit=async()=>{
     if(title.trim()==""){
      toast.error("Title field is empty");
      return; 
    }
    for(let schedule of schedules){
      if(schedule.name==title.trim()){
        toast.error("Title '"+title+"' is already in use");
      return; 
      }
    }
    try{
     await addToSchedule(title)
     loadSchedules()
     toast.success("Scheduale created scuccessfuly")
    }catch(err){
      toast.error("Error while creating schedule")
    }
    setTitle("")
  } 

  useEffect(()=>{
     loadSchedules();
  },[])

  const downloadExcel=(data,semester,filename="data.xlsx")=>{
    exportToExcelWithStyling(data,semester,filename);
  }
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

 const handleFileChange = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  
  reader.onload = (e) => {
    const content = e.target.result;
    try {
      const json = JSON.parse(content);
      setJsonData(json);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  };

  if (file) {
    reader.readAsText(file);
  }
};


   return (
    <div>
      <Toaster/>
       <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete the schedule?
          </Typography>
          <div style={{display:'flex',alignItems:"center",justifyContent:"center",gap:"20px"}}>
           <Button 
           variant='contained'
           color="error"

           onClick={async()=>{
            await deleteSchedule(s_id)
            loadSchedules()
            setOpen(false)
           }}>Delete</Button> <Button
           variant='contained'
           color="info"
           onClick={handleClose}
           >Cancel</Button>
           </div>
        </Box>
      </Modal>


      <Modal
        open={open2}
        onClose={()=>{setOpen2(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Open the saved schedule file
          </Typography>
          <div style={{display:'flex',alignItems:"center",justifyContent:"center",gap:"40px"}}>
          <input type="file" accept=".json" onChange={handleFileChange} />
        
          
           <Button 
           variant='contained'
           color="success"
            disabled={!jsonData}
           onClick={async()=>{
            for(let schedule of schedules){
              if(schedule.name==title){
                toast.error("Title '"+title+"' is already in use")
                return;
              }
            }
            try{
              await handleUpload(jsonData,title)
              loadSchedules()
              toast.success("Schedule uploaded successfully")
            }catch(err){
              toast.error("Error uploading schedule")
            }
            } 
           }>Upload</Button> <Button
           variant='contained'
           color="info"
           onClick={()=>setOpen2(false)}
           >Cancel</Button>
           </div>
        </Box>
      </Modal>
      <Modal
        open={open3}
        onClose={()=>{setOpen3(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            Select semester to export:
        </Typography>
        <Button onClick={async()=>{
        
            try{ 
                  const data= await getEventsSchedule(s_id)
                 // downloadJSON(saved,item.name+".json")
                 await downloadExcel(data,1,sname+"_Fall")
                 toast.success("Schedule exported")
            }catch(err){
              toast.error("Error while exporting schedule")
            }
           
         setOpen3(false)
        }} variant='contained'>Fall</Button>
        <Button
         onClick={async()=>{
          try{ 
            const data= await getEventsSchedule(s_id)
           // downloadJSON(saved,item.name+".json")
           await downloadExcel(data,2,sname+"_Winter")
           toast.success("Schedule exported")
         }catch(err){
          toast.error("Error while exporting schedule")
         }
     
          setOpen3(false)
         }}
        variant='contained'>Winter</Button>
        <Button 
         onClick={async()=>{
          try{ 
            const data= await getEventsSchedule(s_id)
           // downloadJSON(saved,item.name+".json")
           await downloadExcel(data,3,sname+"_Summer")
           toast.success("Schedule exported")
      }catch(err){
        toast.error("Error while exporting schedule")
      }
     
          setOpen3(false)
         }}
        variant='contained'>Summer</Button>
        <Button variant='contained' color="error" onClick={()=>{
          setOpen3(false)
        }}>Cancel</Button>
        </Box>
      </Modal>
     <Box component="form" sx={{ 
        p: 2, border: '1px dashed grey' 
        ,display:'flex',alignItems:"center",justifyContent:"center",
        gap:1
        ,flexDirection:"column"
        }}
     
        >
     <h1>Create new schedule</h1>
     <TextField value={title} onChange={(e)=>{
        setTitle(e.target.value)
     }} id="outlined-basic" label="Schedule title" variant="outlined" />
     <Button endIcon={<AddIcon/>} onClick={handleSubmit} variant="contained" color="success">Create schedule</Button>
     <Button endIcon={<UploadIcon/>} onClick={()=>{
      setOpen2(true)
     }} variant='contained' color="info">Upload schedule</Button>
    
    </Box>
    <h1>List of schedules</h1>
    <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
        {schedules&& schedules.map(item=>{
          console.log(item)
            return <Item sx={{ padding:0,  display:"flex",alignItems:"center",gap:"30px",justifyContent:"center"}}> <h1 style={{fontSize:50}}>
              
              {item.name} || {item.created_at.split(" ")[0]}
              
              </h1> 
            
            
              <BoxedIcon >  <EditIcon 
            sx={{fontSize:35}}
            className="download-icon"
            onClick={()=>{
                     localStorage.setItem("schedules",null)
                     navigator("/schedule/"+item.id)
            }}
            /></BoxedIcon> 
         <BoxedIcon ><DeleteForever
           sx={{fontSize:35}}
           className="delete-icon"
           onClick={()=>{
            handleOpen()
            setSID(item.id)
           }}
           
           /></BoxedIcon>  

<BoxedIcon > <FileDownloadIcon  
           className="download-icon"
           sx={{fontSize:35}}
           onClick={async()=>{
            try{
            const data= await getEventsSchedule(item.id)
              await downloadJSON(data,item.name)
                toast.success("Schedule saved successfully")
            }catch(err){
               toast.error("Error while saving the schedule")
            }

           }}/>
</BoxedIcon> 
<BoxedIcon >    <img onClick={()=>{
            setSID(item.id)
            setSName(item.name)
            setOpen3(true)
           }} className='excel-image'  src='https://logodownload.org/wp-content/uploads/2020/04/excel-logo-0.png' />
            </BoxedIcon> 
            </Item>
        })}
        
        
      </Stack>
      <Box>
   
 
     

      </Box>
         
    </Box>
    

   
    </div>
   )
}

export default Schedules