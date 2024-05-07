
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
  const loadLists=async()=>{  
    const courses=await getCourses(false,params)
    let professors=[]
  
    if(courses.length>0){
      professors=await getProfessors(false,{Course:courses[selectedCourse].id})
    
    }
    

    setCoursesList(courses)
    setProfessorsList(professors)


  }
  useEffect(()=>{
   loadLists();
  },[params,selectedCourse])
  return <div style={{height:"100%",width:"100%"}}>
    
    <Stack height="90%" spacing={5}>
        <SchaduleBar params={params} setParams={setParams} />
      
      <Stack height={"100%"} direction="row" spacing={2}>
        <Item width={"250px"}>
          <Courses  {...{ coursesList, selectedCourse, setSelectedCourse  }}/>
        </Item>
        <Item width={"250px"}><Professors {...{professorsList,selectedProfessor,setSelectedProfessor}}/></Item>
        <Item width={"100%"}>

      {/*    <Week /> */}
      <Week2 {...{selectedCourse,selectedProfessor,coursesList,professorsList}} />
        </Item>
      </Stack>

      </Stack>
  </div>
}

export default Schedule