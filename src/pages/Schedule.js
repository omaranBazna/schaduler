
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

const majorsMap={
  1:"Electrical Eng.",
  2:"Robotics",
  3:"Computer Sci"
}
const yearsMap={
  1:"First",
  2:"Second",
  3:"Third",
  4:"Fourth",
  5:"Grad"
}

function updateEvents(setEvents,new_events,year,major,semester,schedule,setChanged,deleteItem,delete_id){

  let copy=[...new_events]
  copy.sort((event1,event2)=>{
    
    if(event1.currentDay === event2.currentDay){
         return dayjs(event1.selectedStart).diff(dayjs(event2.selectedStart),"minute")
    }
    return event1.currentDay - event2.currentDay
  })
  let valid=true
  for(let i=0;i<copy.length-1;i++){
    let event1=copy[i];
    let event2=copy[i+1];
    if(event1.currentDay===event2.currentDay){
      let time1=dayjs(event1.selectedEnd)
      let time2=dayjs(event2.selectedStart)
      if(time2.diff(time1,"minute") <0){

        if(event1.professor || event2.professor){
          valid=false

          let id1,id2
          if(event1.professor_id){ 
            id1=event1.professor_id
          }else id1=event1.event_professor.id
          if(event2.professor_id){ 
            id2=event2.professor_id
          }else id2=event2.event_professor.id
          
          valid = id1 !=id2
         // 
         /*
           should add more complex logic to handle the case that only busy professor
           event prevent the same professor
         */
        }else{
         valid=false
        }
      }

     
    }
  }
  
  if(!valid) {
    return false;
  }
  if(valid){
    console.log("valid ",valid)
  setEvents(new_events)
  let localEvents=localStorage.getItem("schedules")
  let obj=JSON.parse(localEvents)
  console.log(new_events.filter(item=>!item.dead && !item.professor))
  obj[schedule+" "+major+" "+year+" "+semester]=new_events.filter(item=>!item.dead && !item.professor)
  localStorage.setItem("schedules",JSON.stringify(obj))
  setChanged(true)
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
  const [changed,setChanged]=useState(false)
  const [searchTerm,setSearchTerm]=useState("")
  const loadLists=async(load_params,course_index,prof_index)=>{  

    const courses=await getCourses(false,load_params)
    let professors=[]
  
    if(courses.length>0){
      try{
      professors=await getProfessors(false,{Course:courses[course_index].id})

      loadProfessors(professors[prof_index],load_params.Year,load_params.Major,load_params.Semester)
      }catch(err){
       
        console.log(err)
      }
    }else{
      loadProfessors(undefined,load_params.Year,load_params.Major,load_params.Semester)
    }
   
    courses.sort((a,b)=>{
        return 1
    })
    setCoursesList(courses)
    setProfessorsList(professors)


  }
  const loadProfessors=async(prof,year_p,major_p,semester_p)=>{
   try{
    let data1=[]
    if(prof){
     data1=await getProfessorsEvents(semester_p,id,prof.id)
    
     data1=data1.filter(item=>item.major != major_p || item.year!=year_p)
     
     let localSchedules=localStorage.getItem("schedules")
   
     if(localSchedules && JSON.parse(localSchedules) !=null){
      let obj=JSON.parse(localSchedules) 
     
      for(let year of [1,2,3,4,5]){
       for(let major of [1,2,3]){
        if(year==year_p && major==major_p) continue
      let events=obj[id+" "+major+" "+year+" "+semester_p]
     
      if(!events) continue
      for(let event of events){
       
        if(event.professor_id==prof.id || event.event_professor.id==prof.id){
          if(data1.find(item=>item.id==event.id)) continue
          if(event.selectedStart){
          data1.push({
            startDate:event.selectedStart,
            endDate:event.selectedEnd,
            day:event.currentDay,
            year:year,
            major:major,
            profssor:event.professor_id
           })
          }else{
            data1.push({
              startDate:event.startDate,
              endDate:event.endDate,
              day:event.day,
              year:year,
              major:major,
              professor_id:event.professor.id
             })
          }
        }
      }
    }
       }
     }
  
     data1=data1.map(item=>{
    
      return {...item,professor:true,
        selectedStart: dayjs(item.startDate),
        selectedEnd:dayjs(item.endDate),
        currentDay:item.day,
        year:yearsMap[item.year],
        major:majorsMap[item.major]

      }
     }).filter(item=>{
      return item.year !== year_p || item.major !== major_p
     })
    }
    
    
     let data=await getEvents(major_p,year_p,semester_p,id)


   if(data.length>0 && data[0].currentDay==undefined){
     data=data.map(item=>{
     
       return {...item,currentDay:item.day,
      title:`
       ${item.event_course.course_name}
       |
       ${item.event_course.course_code}
       |
       ${item.event_professor.professor_name}
       `
     , selectedStart: dayjs(item.startDate),
     selectedEnd:dayjs(item.endDate),
     
     }
     })
    }
    
     //updateEvents(setEvents,[...initialEvents,...data1,...data],params.Year,params.Major,params.Semester,id)
   
     setEvents([...initialEvents,...data1,...data])


   }catch(err){
     console.log(err)
   }
  }
  


  useEffect(()=>{
   loadLists({
    Year:1,
    Major:1,
    Semester:1
  },0,0);
   localStorage.setItem("schedule_id",id)
  },[])
  
 
  

  return <div style={{height:"100%",width:"100%"}}>
    
    <Stack height="90%" spacing={5}>
        <SchaduleBar  {...{searchTerm,setSearchTerm,changed,setChanged,setSelectedCourse,setSelectedProfessor,loadLists,loadProfessors}}   events={events} scheduleId={id} {...{params,setParams}}    />
      
      <Stack height={"100%"} direction="row" spacing={2}>
        <Item width={"250px"}>
          <Courses  {...{params, coursesList, selectedCourse, setSelectedCourse ,loadLists,loadProfessors ,setSelectedProfessor }}/>
        </Item>
        <Item width={"250px"}><Professors {...{params,professorsList,selectedProfessor,setSelectedProfessor,loadProfessors}}/></Item>
        <Item width={"100%"}>

     
      <Week2 searchTerm={searchTerm} setChanged={setChanged} schedule={id} year={params.Year} major={params.Major} semester={params.Major} {...{setEvents,updateEvents,events,selectedCourse,selectedProfessor,coursesList,professorsList}} />
        </Item>
      </Stack>

      </Stack>
  </div>
}

export default Schedule