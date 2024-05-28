import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import SettingsIcon from '@mui/icons-material/Settings';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { styled } from '@mui/material/styles';
import {Editor } from '@monaco-editor/react';

const CodeEditor = () => {
  return (
    <div >
      <Editor
        height="500px"
        defaultLanguage="javascript"
        defaultValue="// Start coding here!"
        theme="vs-dark"
      />
    </div>
  );
};



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-10%, -50%)',
    width: "100%",
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


export default function Professors({professorsList,selectedProfessor,setSelectedProfessor,loadProfessors,params}) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [criteria,setCriteria] = React.useState(["num of courses he can teach","professor time preference","professor course preference","seniority","professor type (full time is more)","teach this course before?"])
 

 const upArrow=(index)=>{
 
  if(index===0) return;
  const new_criteria=[...criteria]
  let temp=new_criteria[index]
  new_criteria[index]=new_criteria[index-1]
  new_criteria[index-1]=temp
  setCriteria(new_criteria)
}
const downArrow=(index)=>{
 if(index===criteria.length-1) return;
  const new_criteria=[...criteria]
  let temp=new_criteria[index]
  new_criteria[index]=new_criteria[index+1]
  new_criteria[index+1]=temp
  setCriteria(new_criteria)
}
console.log(professorsList)
  return (
    <Box sx={{ width: '100%' }}>

<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{width:"1000px"}}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Sorting algorithm
          </Typography>
          {"function sort(course1,course2){"}
           <CodeEditor/>
         {"}"}
        </Box>
      </Modal>

       {/*<SortingIcon   onClick={handleOpen} />*/}
        
        <Divider textAlign="left">Professors </Divider>
       
      <Stack  gap={3}>
       
        {professorsList.map((prof,index)=>{
          if(index===selectedProfessor){
          return   <Item sx={{backgroundColor:"#FFB525"}}>{prof.professor_name}</Item>
          }else{
            return   <Item onClick={()=>{
              setSelectedProfessor(index)
              
              loadProfessors(professorsList[index],params.Year,params.Major,params.Semester)
            }}>{prof.professor_name}</Item>
          }
        })}
      </Stack>

      <Divider textAlign="left">Professor Notes  </Divider>
       <Box margin={2}>
         {professorsList && professorsList[selectedProfessor] && professorsList[selectedProfessor].professor_notes !=""?<>{professorsList[selectedProfessor].professor_notes}</>:<>No notes</>}
         
       </Box>
    </Box>
  );
}