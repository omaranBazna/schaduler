import {Button,TextField,Divider ,FormGroup,FormControl,FormControlLabel,Checkbox ,FormHelperText,InputLabel,Input} from '@mui/material';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const majorsMap={
   "1":"Electrical engineering",
   "2":"Robotics",
   "3":"Computer science"
}

const yearsMap={
   "1":"First",
   "2":"Second",
   "3":"Third",
   "4":"Fourth",
   "5":"Graduate"
}

const semestersMap={
   "1":"Fall",
   "2":"Winter",
   "3":"Summer"
}
const typesMap={
   "1":"online",
   "2":"inperson",
   "3":"async",
   "4":"online+inperson"
}


const TagComp=({content,index,array,setArray,map})=>{
 
   return <div  style={{
      display:"flex",flexDirection:"row",alignItems:"center",
      justifyContent:"space-between",padding:"10px",
      gap:"10px",
      background:"rgba(80,188,230,0.2)",borderRadius:"30px"}}>
      
      
      {map[content]}
      <DeleteForeverIcon 
      style={{cursor:"pointer"}}
      onClick={()=>{
         let new_array=array.filter((it,inx)=>inx!=index)
         setArray(new_array)
      }}/>
   </div>
}

const AddCourse=()=>{
   const [professorName,setProfessorName]=useState("")
   const [professorMajor,setProfessorMajor]=useState("")
  const [majors,setMajors]=useState([])
  const [years,setYears]=useState([])
  const [semesters,setSemesters]=useState([])
  const [hasLab,setHasLab]=useState(false)
  const [courseType,setCourseType]=useState(1)
  const [courseNotes,setCourseNotes]=useState("")
  const handleSelectMajor=(e)=>{
   let val=e.target.value
   if(val==0) return;
   
   for(let i=0;i<majors.length;i++){
    if(majors[i]==val) return
   }

   setMajors([...majors,e.target.value])
   
  }

  const handleSelectYear=(e)=>{
   let val=e.target.value
   if(val==0) return;
   
   for(let i=0;i<years.length;i++){
    if(years[i]==val) return
   }

   setYears([...years,e.target.value])
   
  }
  const handleSelectSemester=(e)=>{
   let val=e.target.value
   if(val==0) return;
   
   for(let i=0;i<semesters.length;i++){
    if(semesters[i]==val) return
   }

   setSemesters([...semesters,e.target.value])
   
  }

  return <div style={{height:"100%",width:"100%" ,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"start"}}>
   <div style={{border:"2px solid rgb(100,200,255)"
   ,padding:'20px',borderRadius:"20px",
   gap:"10px",
     width:"40%" ,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
 <FormGroup style={{display:'flex' ,flexDirection:"row",gap:"20px",padding:"30px"}}>
 <FormControl>
   <InputLabel htmlFor="my-input">Course name</InputLabel>
   <Input value={professorName} onChange={(e)=>{
      setProfessorName(e.target.value)
   }} id="my-input" aria-describedby="my-helper-text" />
   <FormHelperText id="my-helper-text">Please enter the course name.</FormHelperText>
</FormControl>

<FormControl>
   <InputLabel htmlFor="my-input">Course Code</InputLabel>
   <Input value={professorMajor} onChange={(e)=>{
      setProfessorMajor(e.target.value)
   }} id="my-input" aria-describedby="my-helper-text" />
   <FormHelperText id="my-helper-text">Ex. CSE3213</FormHelperText>
</FormControl>
</FormGroup>

<Divider textAlign="left">Course major(s) </Divider>

<FormControl style={{display:"flex",flexDirection:"row",gap:"10px",padding:"20px"}}>
   
     <Box style={{display:"flex",flexDirection:"row",gap:"20px"}}>{majors.map((item,index)=> {
      return <TagComp map={majorsMap} content={item} index={index} array={majors} setArray={setMajors}/>})
      } </Box>
       <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={0}
          label="Age"
          onChange={ handleSelectMajor}
        >
          <MenuItem value={0}><i>Select major</i></MenuItem>
          <MenuItem value={1}>Electrical engineering</MenuItem>
          <MenuItem value={2}>Robotics</MenuItem>
          <MenuItem value={3}>Computer science</MenuItem>

          
        </Select>

        
</FormControl>

<Divider textAlign="left">Course year(s) </Divider>

<FormControl style={{display:"flex",flexDirection:"row",gap:"10px",padding:"20px"}}>
   
   <Box style={{display:"flex",flexDirection:"row",gap:"20px"}}>{years.map((item,index)=> {
      return <TagComp map={yearsMap} content={item} index={index} array={years} setArray={setYears}/>})
      } </Box>
       <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={0}
          label="Age"
          onChange={ handleSelectYear}
        >
          <MenuItem value={0}><i>Select year</i></MenuItem>
          <MenuItem value={1}>First</MenuItem>
          <MenuItem value={2}>Second</MenuItem>
          <MenuItem value={3}>Third</MenuItem>
          <MenuItem value={4}>Fourth</MenuItem>
          <MenuItem value={5}>Graduate</MenuItem>
        </Select>
  
</FormControl>

<Divider textAlign="left">Course semester(s) </Divider>

<FormControl style={{display:"flex",flexDirection:"row",gap:"10px",padding:"20px"}}>
   
<Box style={{display:"flex",flexDirection:"row",gap:"20px"}}>{semesters.map((item,index)=> {
      return <TagComp map={semestersMap} content={item} index={index} array={semesters} setArray={setSemesters}/>})
      } </Box>
       <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={0}
          label="Age"
          onChange={ handleSelectSemester}
        >
          <MenuItem value={0}><i>Select semester</i></MenuItem>
          <MenuItem value={1}>Fall</MenuItem>
          <MenuItem value={2}>Winter</MenuItem>
          <MenuItem value={3}>Summer</MenuItem>
         
          
        </Select>
  
</FormControl>

<FormGroup style={{display:'flex',alignItems:"center" ,flexDirection:"row",gap:"20px",padding:"30px"}}>
<FormControl>
<FormControlLabel control={<Checkbox checked={hasLab} onClick={()=>{
   setHasLab(!hasLab)
}} />} label="Has Lab?" />
</FormControl>

<FormControl>
   <InputLabel htmlFor="my-input">Course type</InputLabel> {/*online- inperson -async*/ }
   <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={courseType}
          label="Age"
          onChange={(e)=>{setCourseType(e.target.value)}}
        >
        
          <MenuItem value={1}>Online</MenuItem>
          <MenuItem value={2}>Inperson</MenuItem>
          <MenuItem value={3}>Async</MenuItem>
          <MenuItem value={4}>Online+ Inperson</MenuItem>
         
          
        </Select>
</FormControl>
</FormGroup>

   
   <TextField
  placeholder="Course notes"
  multiline
  rows={3}
  style={{width:"100%"}}
  value={courseNotes}
  onChange={(e)=>setCourseNotes(e.target.value)}
  maxRows={6}
/>
<Button variant="contained">Add course</Button>
</div>
  </div>
}

export default AddCourse