import { FormControl ,FormHelperText,InputLabel,Input} from '@mui/material';
  
const AddCourse=()=>{
  return <div style={{height:"100%",width:"100%"}}>
 <FormControl>
   <InputLabel htmlFor="my-input">Course name</InputLabel>
   <Input id="my-input" aria-describedby="my-helper-text" />
   <FormHelperText id="my-helper-text">Please enter the course name.</FormHelperText>
</FormControl>

<FormControl>
   <InputLabel htmlFor="my-input">Course Code</InputLabel>
   <Input id="my-input" aria-describedby="my-helper-text" />
   <FormHelperText id="my-helper-text">Ex. CSE3213</FormHelperText>
</FormControl>

<FormControl>
   <InputLabel htmlFor="my-input">Course major(s)</InputLabel>
   <Input id="my-input" aria-describedby="my-helper-text" />
   <FormHelperText id="my-helper-text">Ex. CSE3213</FormHelperText>
</FormControl>


<FormControl>
   <InputLabel htmlFor="my-input">Course year(s)</InputLabel>
   <Input id="my-input" aria-describedby="my-helper-text" />
  
</FormControl>

<FormControl>
   <InputLabel htmlFor="my-input">Course semester(s)</InputLabel>
   <Input id="my-input" aria-describedby="my-helper-text" />
</FormControl>


<FormControl>
   <InputLabel htmlFor="my-input">Course has lab?!</InputLabel>
   <Input id="my-input" aria-describedby="my-helper-text" />
</FormControl>

<FormControl>
   <InputLabel htmlFor="my-input">Course type</InputLabel> {/*online- inperson -async*/ }
   <Input id="my-input" aria-describedby="my-helper-text" />
</FormControl>

<FormControl>
   <InputLabel htmlFor="my-input">Course notes</InputLabel> {/*online- inperson -async*/ }
   <Input id="my-input" aria-describedby="my-helper-text" />

   <FormHelperText id="my-helper-text">Ex. This course need to be ... </FormHelperText>
</FormControl>
  </div>
}

export default AddCourse