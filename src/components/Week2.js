import { useEffect,useState,useRef } from "react"
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FormControl,Input,InputLabel,FormHelperText } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {TimePicker} from "@mui/x-date-pickers/TimePicker"
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import {TextField} from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import toast,{Toaster} from "react-hot-toast";
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import dayjs from 'dayjs';
import { DeleteForever } from "@mui/icons-material";
import ModeIcon from '@mui/icons-material/Mode';
import DatasetLinkedIcon from '@mui/icons-material/DatasetLinked';

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

const colors=[
  {
    value:0,
    color:"red",
    label:"InPerson"
  },
  {
    value:1,
    color:"blue",
    label:"Online"
  },
  {
    value:2,
    color:"orange",
    label:"Lab"
  }
]

let range=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]

let times={
    1:"8:00a.m",
    2:"9:00a.m",
    3:"10:00a.m.",
    4:"11:00a.m",
    5:"12:00p.m",
    6:"01:00p.m",
    7:"02:00p.m",
    8:"03:00p.m",
    9:"04:00p.m",
    10:"05:00p.m",
    11:"06:00p.m",
    12:"07:00p.m",
    13:"08:00p.m",
    14:"09:00p.m",
    15:"10:00p.m",
    16:"11:00p.m"
}


const Times=()=>{

    return <div className="times">
       {range.map(item=>{
        return <div>{
            
            times[item]}</div>
       })}
    </div>
}
const Day=({setCurrentDay,setOpen,day,setSelectedStart,setSelectedEnd,setDuration,
  coursesList, selectedCourse,professorsList, selectedProfessor


})=>{

    function handleClick(item){
      if(!coursesList[selectedCourse] || !professorsList[selectedProfessor]){
        toast.error("Select course and professor to add an event")
         return;
       }
        
    const startTime = dayjs().set('hour', 7+item).startOf('hour');
    const endTime = dayjs().set('hour', 8+item).startOf('hour');

          setCurrentDay(day)
          setSelectedStart(startTime)
          setSelectedEnd(endTime)
          setDuration(60)
       
           setOpen(true)
    }

    return <div className="day">

        {range.map(item=>{
        return <div onClick={()=>{handleClick(item)}} className="slot">  </div>
       })}
    </div>
   
}


function EventsComp({events,setEvents,weekRef,updateEvents}){
  
  const [mouseY,setMouseY]=useState(0)
  const [markY,setMarkY]=useState(0)
  const [modifyEnd,setMoidfyEnd]=useState(false)
  const [modifyStart,setMoidfyStart]=useState(false)
  const startTime = dayjs().set('hour', 8).startOf('hour');
  const endTime = dayjs().set('hour', 23).startOf('hour');
  const [selectedEventIndex,setSelectedEvent]=useState(-1)
  const [initialEnd,setInitialEnd]=useState(0)
  const [initialStart,setInitialStart]=useState(0)
 
  function drawEvent(event){
    let selectedStart=dayjs(event.selectedStart)
    let selectedEnd=dayjs(event.selectedEnd)
    let y = (selectedStart.diff(startTime))/(endTime.add(1,"h").diff(startTime))*100+"% "
    let x = (event.currentDay/5*100)+"%"
    let height= (selectedEnd.diff(selectedStart))/(endTime.add(1,"h").diff(startTime))*100+"%"
    return {x,y,height}
  }

  useEffect(()=>{
    const updateMousePosition=(e)=>{
          setMouseY(e.pageY)
          if(modifyEnd && weekRef.current && selectedEventIndex>-1){
            let rect=weekRef.current.getBoundingClientRect()
            const diff=(e.pageY-markY)/rect.height 
            let timeRange=endTime.diff(startTime.subtract(1.2,"hour"),"minute")
            let mins=Math.floor((diff*timeRange)/5)*5
            
            let new_events=events.map(item=>{
              return {...item}
            })
            new_events[selectedEventIndex].selectedEnd=dayjs(initialEnd).add(mins,"minute")
              
            updateEvents(setEvents,new_events);
          }

          if(modifyStart && weekRef.current && selectedEventIndex>-1){
            let rect=weekRef.current.getBoundingClientRect()
            const diff=(e.pageY-markY)/rect.height 
            let timeRange=endTime.diff(startTime.subtract(1,"hour"),"minute")
            let mins=Math.floor((diff*timeRange)/5)*5
            
            let new_events=events.map(item=>{
              return {...item}
            })
            new_events[selectedEventIndex].selectedStart=dayjs(initialStart).add(mins,"minute")
            updateEvents(setEvents,new_events);
          }
         
    }
    window.addEventListener("mousemove",updateMousePosition)
    

    return ()=>{
      window.removeEventListener("mousemove",updateMousePosition)
    }
  },[markY,modifyEnd,modifyStart,initialEnd])

  

  function startTrackingEnd(){
    setMoidfyEnd(!modifyEnd);
    setMarkY(mouseY)
     
  }

  function startTrackingStart(){
    setMoidfyStart(!modifyStart);
    setMarkY(mouseY)
     
  }
  
  
 
    return <>
        {events.map((item,index)=>{
         
            const {x,y,height} =drawEvent(item)
          
            
            if(item.dead){
              return <div className="event" 
              style={
               {top:y,left:x,height:height 
              ,border:"2px dashed red",borderRadius:0,
              backgroundImage:"linear-gradient(45deg, #ffffff 25%, #ffaaaa 25%, #ffaaaa 50%, #ffffff 50%, #ffffff 75%, #ffaaaa 75%, #ffaaaa 100%)",
              backgroundSize:"8px 8px"
             
              }
              } 
              >

                
              </div>
            }
            if(item.professor){
              return <div className="event" 
              style={
               {top:y,left:x,height:height ,background:"rgba(220,220,10,0.9)"
              ,border:"1px solid yellow",borderRadius:0,color:"black",
              display:"flex",alignItems:"center",justifyContent:"center"
              
              }
              } 
              > 
              Professor is Busy 
                
              </div>
            }
              

            return <EventBoxEl   
            {...{startTrackingStart,setInitialStart,setSelectedEvent,
              item,index,setMoidfyEnd,setMoidfyStart,events,x,y,height,updateEvents,setEvents
             , startTrackingEnd,setInitialEnd}}
            />
           
        })}
    </>
}
const EventBoxEl=({startTrackingStart,setInitialStart,setSelectedEvent,
 item,index,setMoidfyEnd,setMoidfyStart,events,x,y,height,updateEvents,setEvents
, startTrackingEnd,setInitialEnd
})=>{

 const eventBox=useRef(null)
 useEffect(()=>{
  let node
  let enterListener=function(e){
    if(!node) return 
    node.classList.add("active")
    node.classList.remove("inactive")

  }
  let leaveListener=function(e){
    if(!node) return 
    setTimeout(()=>{
      node.classList.add("inactive")
      node.classList.remove("active")
    },500)
  }
  
  if(eventBox && eventBox.current){
    console.log(eventBox.current)
    node=eventBox.current
    node.classList.add("inactive")
    eventBox.current.addEventListener("mouseover",enterListener)
    eventBox.current.addEventListener("mouseleave",leaveListener)
  }
  return ()=>{
    if(node){
      node.removeEventListener("mouseover",enterListener)
      node.removeEventListener("mouseleave",leaveListener)
    }
  }
 },[])

  return <div ref={eventBox} className="event" style={{top:y,left:x,height:height ,background:item.color.color}}>  
  <span className="expand top-e" onClick={()=>{
   
   startTrackingStart();
   setInitialStart(dayjs(item.selectedStart))
   setSelectedEvent(index)

}}></span>
   <div className="event-box" onClick={()=>{
   
     setMoidfyEnd(false)
     setMoidfyStart(false)
   }}>
     <span className="left-right" onClick={()=>{
        let new_events=events.map(item=>{
         return {...item}
       })
         let day=new_events[index].currentDay
         if(day>0){
           new_events[index].currentDay=day-1
         }
         updateEvents(setEvents,new_events);
     }}></span>
  
     <div style={{width:"100%",height:"100%", display:"flex",flexDirection:"column",alignItems:"flex-start",justifyContent:"flex-start"}}>
       <div>
       <DeleteIcon onClick={()=>{
         let new_events=events.filter((_item)=>{
              return item !=_item
         })
         setEvents(new_events)
       }}/>
       <ModeIcon/>
       <DatasetLinkedIcon/>
       </div>
       <div>
        {item.title}
        </div>
     </div>
    
     
     
     
   <span className="left-right"
   
   onClick={()=>{
 
     let new_events=events.map(item=>{
       return {...item}
     })
      let day=new_events[index].currentDay
      if(day<5){
        new_events[index].currentDay=day+1
      }
      updateEvents(setEvents,new_events);
  }}
   ></span>
  </div>
   <span className="expand bottom-e" onClick={()=>{
   
      startTrackingEnd();
      setInitialEnd(dayjs(item.selectedEnd))
      setSelectedEvent(index)

   }}></span>
    </div>
}

const Week2=({setEvents,updateEvents,events,selectedCourse,selectedProfessor,coursesList,professorsList})=>{

    const weekRef=useRef(null)
    const [dimensions,setDimensions]=useState({x:0,y:0,width:0,height:0})

   
    const [open,setOpen]=useState(false)

    useEffect(()=>{

        if(weekRef.current){
           let rect=weekRef.current.getBoundingClientRect()
           setDimensions(
            {
                x:rect.left,
                y:rect.top,
                width:rect.width,
                height:rect.height
            }
           )
        }

    },[])

    const handleClose=()=>{
        setOpen(false)
    }


   

    const today = dayjs();
const startTime = dayjs().set('hour', 8).startOf('hour');
const endTime = dayjs().set('hour', 23).startOf('hour');

const [selectedStart,setSelectedStart]=useState(startTime)
const [selectedEnd,setSelectedEnd]=useState(endTime)
const [currentDay,setCurrentDay]=useState(0)
const [duration, setDuration] = useState('60');
const [eventColor,setEventColor]=useState(0)

const handleDurationChange = (event) => {
    const inputValue = event.target.value;
    // Ensure that the input value is a valid number or an empty string
    if (!isNaN(inputValue) || inputValue === '' ) {
        if(inputValue<45) return
        if(inputValue>60*3) return 
      setDuration(inputValue);
      let newEnd=selectedStart.add(inputValue,"minute")
      setSelectedEnd(newEnd)
    }
  };


function addEvent(){
    if(!coursesList[selectedCourse] || !professorsList[selectedProfessor]){
      return;
    }
  let new_events=events.map(item=>{
    return {...item}
  })
    new_events=[...new_events,{
        id:(Math.floor(Math.random()*100000)),
        event_course:coursesList[selectedCourse],
        event_professor:professorsList[selectedProfessor],
        title:`
        ${coursesList[selectedCourse].course_name}
        |
        ${coursesList[selectedCourse].course_code}
        |
        ${professorsList[selectedProfessor].professor_name}
        `,
        selectedStart,
        selectedEnd,
        currentDay,
        color:colors[eventColor]
    }]
    if( updateEvents(setEvents,new_events)){
    setOpen(false)
    toast.success("Added successfully") 
    }else{
    toast.error("Unsuitable time")
    }
}
    return <div  className="schedule">
           <Times/>
           <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
          <FormControl>
  <InputLabel htmlFor="my-input">Course name: </InputLabel>
  <Input id="my-input" aria-describedby="my-helper-text" />
  
  <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker']}>
      <TimePicker
  label="Start time"
  viewRenderers={{
    hours: renderTimeViewClock,
    minutes: renderTimeViewClock,
    seconds: renderTimeViewClock,
  }}
  
  value={selectedStart}
  onChange={(e)=>{
    
    setSelectedStart(e)
    setDuration(selectedEnd.diff(selectedStart,"minute"))
  }}
  maxTime={selectedEnd.subtract(45,"minute")}
  minTime={startTime}
/>
      </DemoContainer>
    </LocalizationProvider>

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker']}>
      <TimePicker
  label="End time"
  viewRenderers={{
    hours: renderTimeViewClock,
    minutes: renderTimeViewClock,
    seconds: renderTimeViewClock,
  }}
  value={selectedEnd}
  onChange={(e)=>{
    setSelectedEnd(e)
    setDuration(selectedEnd.diff(selectedStart,"minute"))
  }}
  maxTime={endTime.isBefore(selectedStart.add(180,"minute")?endTime:selectedStart.add(180,"minute"))}
  minTime={selectedStart.add(45,"minute")}
/>
      </DemoContainer>
    </LocalizationProvider>


</FormControl>

<FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Color</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={eventColor}
          label="Color"
          onChange={(e)=>{
           
            setEventColor(e.target.value)
          }}
          sx={{p:1 ,display:"flex",gap:2}}
        >
          
          {colors.map(item=>{
         return <MenuItem value={item.value} sx={{p:1 ,display:"flex",gap:2}}>

          <Box component="section" sx={{borderRadius:"10px", background:item.color,height:30,width:30}}></Box>
          {item.label}
            </MenuItem>
        })}
          
        </Select>
      
      </FormControl>
<Typography>
    Duration : 
    {(selectedEnd.diff(selectedStart,"minute"))}
</Typography>

<TextField
      label="Duration"
      type="number"
      value={duration}
      onChange={handleDurationChange}
      inputProps={{
        inputMode: 'numeric',
        pattern: '[0-9]*', // Only allow digits
      }}
    />

<Button onClick={addEvent}>Add event</Button>
          </Box>
        </Fade>
      </Modal>
           <div ref={weekRef} className="week">
            {[0,1,2,3,4].map(day=>{
                return  <Day coursesList={coursesList} selectedCourse={selectedCourse} professorsList={professorsList} selectedProfessor={selectedProfessor}   day={day} setOpen={setOpen} setDuration={setDuration} setSelectedStart={setSelectedStart} setSelectedEnd={setSelectedEnd} setCurrentDay={setCurrentDay} />
         
            })}
           <EventsComp updateEvents={updateEvents} weekRef={weekRef}  setEvents={setEvents} events={events} />
           </div>
            

           
            <Toaster/>
            
    </div>

}

export default Week2

///Haj Ahmed (Introduction to engineering) First - EE - Fall
///Haj Ahmed (ELEE) Fourth - EE - Fall
