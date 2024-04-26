
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Week2 from "../components/Week2"
import SchaduleBar from '../components/SchaduleBar';
import Courses from '../components/Courses';
import Professors from '../components/Professors';
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
  return <div style={{height:"100%",width:"100%"}}>
    
    <Stack height="90%" spacing={5}>
        <SchaduleBar />
      
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