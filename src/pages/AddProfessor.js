import {Button,TextField,Divider ,FormGroup,FormControl,FormHelperText,InputLabel,Input} from '@mui/material';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useState ,useEffect} from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { getCoursesList} from "../API/courses"
import { addProfessor } from '../API/professors';
import toast ,{Toaster} from 'react-hot-toast';
import ProfessorsList from '../components/ProfessorsList';
import "../App.css"
import dayjs from 'dayjs';
import { addAvailabilities } from '../API/availabilities';

const daysMap={
   "1":"Monday","2":"Tuesday","3":"Wenesday","4":"Thursday","5":"Friday"
}
const startTime = dayjs().set('hour', 8).startOf('hour');
const endTime = dayjs().set('hour', 23).startOf('hour');

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
         let new_array=array.filter((it,inx)=>inx!==index)
         setArray(new_array)
      }}/>
   </div>
}

const AddProfessorC=()=>{
  const [name,setName]=useState("")
  const [major,setMajor]=useState("")
  const [courses,setCourses]=useState([])
  const [availabilities,setAvailabilities]=useState([])
  const [professorType,setProfessorType]=useState(1)
  const [notes,setNotes]=useState("")
  const [day,setDay]=useState(0)
  const [time,setTime]=useState("8:00a.m.")
  const [endTimeS,setEndTimeS]=useState("8:15a.m.")
  const [duration,setDuration]=useState(60)

  const [coursesList,setCoursesList]=useState([])
  const [coursesMap,setCoursesMap]=useState({})
  const loadCoursesList=async()=>{
      try{
        const list=await getCoursesList()
        setCoursesList(list)
      
        let map={}
        for(let el of list){
          map[el.id]=el.course_name+" ||| "+el.course_code
        }
        setCoursesMap(map)
      }catch(err){

      }
  }
  useEffect(()=>{
     loadCoursesList()
  },[])

  
   const handleAddProfessor=async()=>{
    try{
      if(name=="" || major==""){
        toast.error("Enter first and last name")
        return
      }else if(courses.length==0){
        toast.error("Professor must teach at least one course");
        return;
      }

      let id=  await addProfessor(name,major,courses,availabilities,professorType,notes)
       await addAvailabilities(availabilities,id)
       setName("")
       setMajor("")
       setCourses([])
       setAvailabilities([])
       setProfessorType(1)
       setNotes("")
          toast.success("Professor added successfully")
          
      }catch{
        toast.error("Error adding professor")
    }
    }

  const handleSelectCourse=(e)=>{
   let val=e.target.value
   if(val===0) return;
   
   for(let i=0;i<courses.length;i++){
    if(courses[i]===val) return
   }

   setCourses([...courses,e.target.value])
   
  }

 
  const handleAddAvailability=()=>{
   if(day===0) return 
   
   setAvailabilities([...availabilities,{
      day,time,duration
   }])
  }

  const AvailabilityComp=({item,index,availabilities,setAvailabilities})=>{
       return <div className="availability-comp" style={{border:"1px solid #3ec9f0", padding:"10px",borderRadius:"10px",  width:"100%",justifyContent:"center",display:'flex',gap:"30px"}}>

         <div>{daysMap[item.day]}</div> <div> {item.time.format('hh:mm A')} </div> <div>{item.time.add(item.duration,"minutes").format("hh:mm A")}</div> 
         <DeleteForeverIcon style={{cursor:"pointer"}} onClick={()=>{
             setAvailabilities(availabilities.filter((_,inx)=>inx!==index))
         }}/>
       </div>
  }

  return <div style={{height:"100%",width:"100%",marginTop:"20px" ,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"start"}}>
   <Toaster/>
   <div style={{border:"2px solid rgb(100,200,255)"
   ,padding:'20px',borderRadius:"20px",
   gap:"10px",
     width:"40%" ,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
 
 
 <FormGroup style={{display:'flex' ,flexDirection:"row",gap:"20px",padding:"30px"}}>
 <FormControl>
   <InputLabel htmlFor="my-input">Professor first name</InputLabel>
   <Input value={name} onChange={(e)=>{
    setName(e.target.value)
   }} id="my-input" aria-describedby="my-helper-text" />
   
</FormControl>

<FormControl>
   <InputLabel htmlFor="my-input">Professor last name</InputLabel>
   <Input value={major} onChange={(e)=>{
    setMajor(e.target.value)
   }} id="my-input" aria-describedby="my-helper-text" />
 
</FormControl>
</FormGroup>

<Divider textAlign="left">Professor courses(s) </Divider>

<FormControl style={{display:"flex",flexDirection:"row",gap:"10px",padding:"20px"}}>
   
     <Box style={{display:"flex",flexWrap:"wrap",flexDirection:"row",gap:"20px"}}>{courses.map((item,index)=> {
      return <TagComp map={coursesMap} content={item} index={index} array={courses} setArray={setCourses}/>})
      } </Box>
       <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={0}
          onChange={ handleSelectCourse}
        >
          <MenuItem value={0}><i>Select courses</i></MenuItem>
    
          {coursesList.map(course=>{
            return  <MenuItem value={course.id}>{course.course_name} - {course.course_code}</MenuItem>
          })}
          
        </Select>

        
</FormControl>

<Divider textAlign="left">Professor availability(s) </Divider>
{availabilities.map((item,index)=>{
   return <AvailabilityComp availabilities={availabilities} setAvailabilities={setAvailabilities} item={item} index={index} />
})}

<FormControl style={{display:"flex",flexDirection:"column",gap:"10px",padding:"20px"}}>
   <div>

       <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={day}
          onChange={ (e)=>{setDay(e.target.value)}}
        >
          <MenuItem value={0}><i>Select day</i></MenuItem>
          <MenuItem value={1}>Monday</MenuItem>
          <MenuItem value={2}>Tuesday</MenuItem>
          <MenuItem value={3}>Wednesday</MenuItem>
          <MenuItem value={4}>Thursday</MenuItem>
          <MenuItem value={5}>Friday</MenuItem>
        </Select>
      </div>       
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker']}>
        <TimePicker onChange={(e)=>{
         setTime(e)
        setDuration(dayjs(endTimeS).diff(e,"minutes"))
        }}  label="Start time" />
      </DemoContainer>
    </LocalizationProvider>


    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker']}>
        <TimePicker  onChange={(e)=>{
         if(e.isAfter(time)){
          let diff=e.diff(time,"minutes")
          setDuration(diff)
          setEndTimeS(e)
         }
        }}    label="End time" />
      </DemoContainer>
    </LocalizationProvider>
<Button onClick={handleAddAvailability} variant='contained' > Add Avaibility</Button>
</FormControl>



<FormGroup style={{display:'flex',alignItems:"center" ,flexDirection:"row",gap:"20px",padding:"30px"}}>


<FormControl>
   <InputLabel htmlFor="my-input">Professor type</InputLabel> {/*online- inperson -async*/ }
   <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={professorType}

          onChange={(e)=>{setProfessorType(e.target.value)}}
        >
        
          <MenuItem value={1}>Full time professor</MenuItem>
          <MenuItem value={2}>adjunct professor</MenuItem>
       
          
        </Select>
</FormControl>
</FormGroup>

   
   <TextField
  placeholder="Professor notes"
  multiline
  rows={3}
  style={{width:"100%"}}
  value={notes}
  onChange={(e)=>setNotes(e.target.value)}
  maxRows={6}
/>
<Button onClick={handleAddProfessor} variant="contained">Add professor</Button>
</div>
<ProfessorsList coursesList={coursesList}/>
  </div>
}

export default AddProfessorC