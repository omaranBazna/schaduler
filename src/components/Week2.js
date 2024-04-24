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

import dayjs from 'dayjs';

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
const Day=({setCurrentDay,setOpen,day,setSelectedStart,setSelectedEnd,setDuration})=>{

    function handleClick(item){

        
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


function EventsComp({events}){
    
    return <>
        {events.map(item=>{
            return <div className="event" style={{top:item.y,left:item.x,height:item.height}}>  {item.title} </div>
        })}
    </>
}


const Week2=()=>{

    const weekRef=useRef(null)
    const [dimensions,setDimensions]=useState({x:0,y:0,width:0,height:0})

    const [events,setEvents]=useState([])
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
    
    let y = (selectedStart.diff(startTime))/(endTime.add(1,"h").diff(startTime))*100+"%"
    
    let x = (currentDay/5*100)+"%"
    let height= (selectedEnd.diff(selectedStart))/(endTime.add(1,"h").diff(startTime))*100+"%"
    setEvents([...events,{
        x:x,
        y:y,
        height:height,
        title:"new event "
    }])
    setOpen(false)
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

<Button onClick={addEvent}>Add course</Button>
          </Box>
        </Fade>
      </Modal>
           <div ref={weekRef} className="week">
            {[0,1,2,3,4].map(day=>{
                return  <Day day={day} setOpen={setOpen} setDuration={setDuration} setSelectedStart={setSelectedStart} setSelectedEnd={setSelectedEnd} setCurrentDay={setCurrentDay} />
         
            })}
           <EventsComp dimensions={dimensions} events={events} />
           </div>
            

           
            
            
    </div>

}

export default Week2