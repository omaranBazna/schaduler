import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import SettingsIcon from '@mui/icons-material/Settings';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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
  };
  


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  cursor:"pointer",
  color: theme.palette.text.secondary,
  display:"flex",
  justifyContent:"space-between",
  "&:hover":{
     background:"#FFB320",
     color:"white"
  },
  "&.active":{
    background:"yellowgreen",
    color:"white"
  }
}));


const SortingIcon=styled(SettingsIcon)(({theme})=>({
  color:"rgb(100,100,100)",
  cursor:"pointer",
  transition:"0.3s",
  "&:hover":{
    color:"rgb(20,20,20)",
    transform:"rotate(-30deg)"
  }
}))


export default function Courses({coursesList,selectedCourse,setSelectedCourse,loadLists
,setSelectedProfessor


}) {


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [criteria,setCriteria] = React.useState(["length","credits","num available professors","online","has lab"])
 

 const upArrow=(index)=>{
 
  if(index==0) return;
  const new_criteria=[...criteria]
  let temp=new_criteria[index]
  new_criteria[index]=new_criteria[index-1]
  new_criteria[index-1]=temp
  setCriteria(new_criteria)
}
const downArrow=(index)=>{
 if(index==criteria.length-1) return;
  const new_criteria=[...criteria]
  let temp=new_criteria[index]
  new_criteria[index]=new_criteria[index+1]
  new_criteria[index+1]=temp
  setCriteria(new_criteria)
}
  return (
    <Box sx={{ width: '100%' }}>

<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Select sorting criteria
          </Typography>
           <Typography id="modal-modal-title" variant="h7" component="h3">
            More / Top
          </Typography>
          {criteria.map((item,index)=> {
            return <Item><ArrowDownwardIcon onClick={()=>{downArrow(index)}}/>  <div>{item}</div><ArrowUpwardIcon onClick={()=>{upArrow(index)}}/></Item>
          })}

           <Typography id="modal-modal-title" variant="h7" component="h3">
            Less / Bottom
          </Typography>
        </Box>
      </Modal>

        <SortingIcon   onClick={handleOpen} />
        
        <Divider textAlign="left">Courses  </Divider>
       
      <Stack  gap={3}>
        {coursesList.map((course,index)=>{
          if(index==selectedCourse) {
           return <Item  sx={{background:"#FFB525"}}>{course.course_name} <CheckCircleIcon/></Item>
          }else{
            return <Item onClick={()=>{
              setSelectedCourse(index)
              setSelectedProfessor(0)
              loadLists()
              
            }}>{course.course_name} <CheckCircleIcon/></Item>
          }
        })}
        
      </Stack>
         
       
      <Divider textAlign="left">Course Notes  </Divider>
       <Box margin={2}>
          Some course notes

       </Box>
       {/* 
      <Divider textAlign="left">Done courses </Divider>
      <Stack  gap={3}>
        <Item>Course 4 <KeyboardReturnIcon/></Item>
        <Item>Course 5 <KeyboardReturnIcon/></Item>
     
      </Stack>
       */}
     
      

    </Box>
  );
}