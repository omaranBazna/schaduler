
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Week2 from "../components/Week2"
import SchaduleBar from '../components/SchaduleBar';
import Courses from '../components/Courses';
import Professors from '../components/Professors';
import { useState ,useEffect} from 'react';
import { getCourses } from '../API/courses';
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
  const [lists,setLists]=useState({
    courses:[],
    professors:[]
  })
  const loadLists=async()=>{  
    const courses=await getCourses(false,params)
    console.log(courses)

  }
  useEffect(()=>{
   loadLists();
  },[params])
  return <div style={{height:"100%",width:"100%"}}>
    
    <Stack height="90%" spacing={5}>
        <SchaduleBar params={params} setParams={setParams} />
      
      <Stack height={"100%"} direction="row" spacing={2}>
        <Item width={"250px"}>
          <Courses/>
        </Item>
        <Item width={"250px"}><Professors/></Item>
        <Item width={"100%"}>

      {/*    <Week /> */}
      <Week2 />
        </Item>
      </Stack>

      </Stack>
  </div>
}

export default Schedule