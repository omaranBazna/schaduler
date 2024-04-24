import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import {ScheduleView,CalendarEvent} from "react-schedule-view"
import moment from 'moment';
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useRef ,useEffect,useState} from 'react';

 const data=[
        {
          id:1,
          name: "Monday",
          events:[]
        },
        {
          id:2,
          name: "Tuesday",
          events:[]
        },
        {
            id:3,
            name:"Wensday",
            events:[]
        },
        {
            id:4,
            name:"Thursday",
            events:[]
        },
        {
            id:5,
            name:"Friday",
         
                events: [
                    {
                        startTime: 19.5,
                        endTime: 20.75,
                        title: "Default Color",
                      }
                  
            ]
        }
      ];

     
function Week() {
    const [topLeft, setTopLeft] = useState({ x: 0, y: 0 });
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [prevId,setPrevId]=useState(0)

    const [keepEventTrigger,setKeepEventTrigger]=useState(false)
    const [day1,setDay1]=useState({
        
            id:1,
            name: "Monday",
            events:[]
          
    })

    const [day2,setDay2]=useState({
        
        id:1,
        name: "Tue",
        events:[]
      
})
const [day3,setDay3]=useState({
        
    id:1,
    name: "Wen",
    events:[]
  
})
const [day4,setDay4]=useState({
        
    id:1,
    name: "Thu",
    events:[]
  
})

const [day5,setDay5]=useState({
        
    id:1,
    name: "Friday",
    events:[]
  
})
    

const events=[
    day1,day2,day3,day4,day5
]
      const sch=useRef(null)
      

      const updateMousePosition = (event) => {
        setMousePosition({ x: event.clientX, y: event.clientY });
      };
      useEffect(()=>{

        const updatePosition = () => {

        if(sch.current){
        const rect = sch.current.getBoundingClientRect();
    // Calculate the position relative to the viewport
    const x = rect.left + window.scrollX;
    const y = rect.top + window.scrollY;
    // Set the top-left position in state
    setTopLeft({ x, y });

    const width = rect.width;
    const height = rect.height;
    setDimensions({ width, height });

    
        }
    }

    updatePosition(); // Initial position calculation

    // Add event listener for scroll
    window.addEventListener('scroll', updatePosition);

   let counter=0

    const handleMouseMove = (event) => {
       
        updateMousePosition(event);
     
        let time =7.5 + (posY()-5)/90*(21-8)
        let id=getDayId()

        if(id !=prevId && prevId>0){
            clearDay(prevId)
        }

        let day=getDay(id)
        getSetDay(id)({...day,events:[...day.events.filter(ev=>!ev.temp),
            {
                dayId:id,
                startTime:time,
                endTime: time+1,
                title: "Default Color",
                temp:true,
                color:"red"
              }
        ]})
        setPrevId(id)
    }
      
  
      // Attach event listener when component mounts
      document.addEventListener('mousedown', handleMouseMove);
  
      // Detach event listener when component unmounts
      return () => {
        document.removeEventListener('mousedown', handleMouseMove);
        window.removeEventListener('scroll', updatePosition);
      };
       
      },[mousePosition,keepEventTrigger])
      const posX=()=>{
        return (mousePosition.x -topLeft.x)/(dimensions.width)*100
      }
      const posY=()=>{
        return (mousePosition.y-topLeft.y)/dimensions.height*100
      }
      

      const getSetDay=(id)=>{
        if(id==1) return setDay1
        if(id==2) return setDay2
        if(id==3) return setDay3
        if(id==4) return setDay4
        if(id==5) return setDay5
      }
      const getDay=(id)=>{
         if(id==1) return day1
         if(id==2) return day2
         if(id==3) return day3
         if(id==4) return day4
         if(id==5) return day5
         
      }
      const getDayId=()=>{
        let val=posX();
        if(val<20) return 1;
        if(val<40) return 2;
        if(val<60) return 3;
        if(val<80) return 4;
        return 5;
      }

      function clearDay(id){
        
        let day=getDay(id)
      
        getSetDay(id)({...day,events:day.events.filter(ev=>!ev.temp)})
      }
      
      function keepEvent(event){
        if(!event.temp) return;
        let id=event.dayId
        let day=getDay(event.dayId)
    
        
        
        getSetDay(id)({...day,events:[...day.events.filter(ev=>!ev.temp),{
            startTime:event.startTime,
            endTime:event.endTime,
            title:event.title
        }]})    
        
   
               
               
           setKeepEventTrigger(!keepEventTrigger) 

      }
    return <div ref={sch}>
       
        
        <ScheduleView  handleEventClick={(event)=>{
        keepEvent(event);
    }} daySchedules={events} viewStartTime={8} viewEndTime={21} >

        </ScheduleView>
    
    
    </div>
       
   
}
export default Week;