
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Week2 from "../components/Week2"
import SchaduleBar from '../components/SchaduleBar';
import Courses from '../components/Courses';
import Professors from '../components/Professors';
import { useState ,useEffect} from 'react';
import { getCourses } from '../API/courses';
import { getProfessors } from '../API/professors';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { getEvents, getProfessorsEvents } from '../API/events';

let professorBusy=[
  {
   
    currentDay:2,
    selectedStart:dayjs().set('hour', 9).startOf('hour'),
    selectedEnd:dayjs().set('hour',10).startOf('hour'),
    professor:true
  },
  {
   
    currentDay:3,
    selectedStart:dayjs().set('hour', 11).startOf('hour'),
    selectedEnd:dayjs().set('hour',13).startOf('hour'),
    professor:true
  },
  {
   
    currentDay:0,
    selectedStart:dayjs().set('hour', 17).startOf('hour'),
    selectedEnd:dayjs().set('hour',19).startOf('hour'),
    professor:true
  },
]
professorBusy=[]

const initialEvents=[
  {
   
    currentDay:2,
    selectedStart:dayjs().set('hour', 8).startOf('hour'),
    selectedEnd:dayjs().set('hour',9).startOf('hour'),
    dead:true
  },
  {
   
    currentDay:3,
    selectedStart:dayjs().set('hour', 9).startOf('hour'),
    selectedEnd:dayjs().set('hour',11).startOf('hour'),
    dead:true
  },
  {
   
    currentDay:1,
    selectedStart:dayjs().set('hour', 12).startOf('hour'),
    selectedEnd:dayjs().set('hour',14).startOf('hour'),
    dead:true
  },
  {
   
    currentDay:0,
    selectedStart:dayjs().set('hour', 12).startOf('hour'),
    selectedEnd:dayjs().set('hour',16).startOf('hour'),
    dead:true
  },
  {
   
    currentDay:4,
    selectedStart:dayjs().set('hour', 8).startOf('hour'),
    selectedEnd:dayjs().set('hour',11).startOf('hour'),
    dead:true
  }
  ,
  {
   
    currentDay:3,
    selectedStart:dayjs().set('hour', 15).startOf('hour'),
    selectedEnd:dayjs().set('hour',17).startOf('hour'),
    dead:true
  },
  ...professorBusy

]

function updateEvents(setEvents,new_events){

  let copy=[...new_events]
  copy.sort((event1,event2)=>{
    
    if(event1.currentDay == event2.currentDay){
         return dayjs(event1.selectedStart).diff(dayjs(event2.selectedStart),"minute")
    }
    return event1.currentDay - event2.currentDay
  })
  let valid=true
  for(let i=0;i<copy.length-1;i++){
    let event1=copy[i];
    let event2=copy[i+1];
    if(event1.currentDay==event2.currentDay){
      let time1=dayjs(event1.selectedEnd)
      let time2=dayjs(event2.selectedStart)
      if(time2.diff(time1,"minute") <0){
        valid=false
      }

     
    }
  }
  
  if(!valid) {
    return false;
  }
  if(valid){
  setEvents(new_events)
  return true
  }
}

const Item = styled(Paper)(({ theme  ,width}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height:"100%",
    width:width
  }));
  
const Schedule=()=>{
  const [params,setParams]=useState({
    Year:1,
    Major:1,
    Semester:1
  })
  const [coursesList,setCoursesList]=useState([])
  const [professorsList,setProfessorsList]=useState([])
  const [selectedCourse,setSelectedCourse]=useState(0)
  const [selectedProfessor,setSelectedProfessor]=useState(0)
  const {id}=useParams();
  const [events,setEvents]=useState(initialEvents)
  const loadLists=async()=>{  
    const courses=await getCourses(false,params)
    let professors=[]
  
    if(courses.length>0){
      professors=await getProfessors(false,{Course:courses[selectedCourse].id})
    
    }
    

    setCoursesList(courses)
    setProfessorsList(professors)


  }
  const loadProfessors=async()=>{
   try{
     let data1=await getProfessorsEvents(params.Semester,id,professorsList[selectedProfessor].id)
     console.log("busy")
     console.log(data1)
     data1=data1.map(item=>{
      return {...item,professor:true,
        selectedStart:dayjs().set('hour', dayjs(item.startDate).hour()).startOf('hour'),
        selectedEnd:dayjs().set('hour',dayjs(item.endDate).hour()).startOf('hour'),
        currentDay:item.day,

      }
     }).filter(item=>{
      return item.year != params.Year || item.major !=params.Major
     })
    
     let data=await getEvents(params.Major,params.Year,params.Semester,id)
     data=data.map(item=>{
     
       return {...item,currentDay:item.day,
      title:`
       ${item.event_course.course_name}
       |
       ${item.event_course.course_code}
       |
       ${item.event_professor.professor_name}
       `
     , selectedStart:dayjs().set('hour', dayjs(item.startDate).hour()).startOf('hour'),
     selectedEnd:dayjs().set('hour',dayjs(item.endDate).hour()).startOf('hour'),
     
     }
     })
    
   
    
     setEvents([...initialEvents,...data1,...data])


   }catch(err){

   }
  }
  /*const loadEvents=async()=>{
       
         try{
            let data=await getEvents(params.Major,params.Year,params.Semester,id)
            data=data.map(item=>{
            
              return {...item,currentDay:item.day,
             title:`
              ${item.event_course.course_name}
              |
              ${item.event_course.course_code}
              |
              ${item.event_professor.professor_name}
              `
            , selectedStart:dayjs().set('hour', dayjs(item.startDate).hour()).startOf('hour'),
            selectedEnd:dayjs().set('hour',dayjs(item.endDate).hour()).startOf('hour'),
            
            }
            })
           
          
           
            setEvents([...initialEvents,...data])
         }catch(err){
          console.log(err)
         }
  }*/

  
  useEffect(()=>{
   loadLists();
  
   
  },[params,selectedCourse])
  useEffect(()=>{
    loadProfessors();

  },[params,selectedProfessor])
 

  return <div style={{height:"100%",width:"100%"}}>
    
    <Stack height="90%" spacing={5}>
        <SchaduleBar events={events} scheduleId={id} {...{params,setParams}}    />
      
      <Stack height={"100%"} direction="row" spacing={2}>
        <Item width={"250px"}>
          <Courses  {...{ coursesList, selectedCourse, setSelectedCourse  }}/>
        </Item>
        <Item width={"250px"}><Professors {...{professorsList,selectedProfessor,setSelectedProfessor}}/></Item>
        <Item width={"100%"}>

     
      <Week2 {...{setEvents,updateEvents,events,selectedCourse,selectedProfessor,coursesList,professorsList}} />
        </Item>
      </Stack>

      </Stack>
  </div>
}

export default Schedule