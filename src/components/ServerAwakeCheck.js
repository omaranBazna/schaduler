import { Box } from "@mui/material"
import { useEffect,useState } from "react"
import CircularProgress from '@mui/material/CircularProgress';
const renderServer="https://schaduler.onrender.com"
const ServerAwakeCheck=()=>{
    const [awake,setAwake]=useState(false)
    const [time,setTime]=useState(0)
    

    useEffect(()=>{

       
        const interval=setInterval(()=>{
            setTime((old)=>{
                return old+1
            });
            fetch(renderServer).then((data)=>{
                
                setAwake(true)
                setTime(0)
            }).catch(err=>{
                setAwake(false)
            })
         
        },1000)
        return () => clearInterval( interval);
    },[])
    if(!awake){
    return <>
    <Box
    sx={{
        position:"absolute",
        left:0,top:0,
        height:"100vh",width:"100vw",
        background:"rgb(0,0,0,0.8)",
        zIndex:900
    }}
    
    >

    </Box>
    <Box
    sx={{
        position:"absolute",
        left:"calc( 50% - 300px)",
        top:"calc( 50% - 400px)",
        background:"white",
        width:"600px",
        height:"400px",
        border:"2px solid black",
        zIndex:"1000",
        fontSize:30,
        display:"flex",
        flexDirection:"column",
        gap:2,
        justifyContent:"flex-start",
        alignItems:"center"

    }}
    >
        <div></div>
       <div>The server we are using is a free server😢</div>
        <div>Please wait until the server awake it will take around 30 seconds ⏰</div>
      <div>{time} (s)</div>
       <CircularProgress />
       <div>If it took more than 10 minutes , most likly there is a problem with the server</div>
    </Box></>
    }
    return <></>
}

export default ServerAwakeCheck