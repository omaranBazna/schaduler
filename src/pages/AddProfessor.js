import { FormControl ,FormHelperText,InputLabel,Input} from '@mui/material';
  
const AddProfessor=()=>{
  return <div style={{height:"100%",width:"100%"}}>
 <FormControl>
   <InputLabel htmlFor="my-input">Professor full name</InputLabel>
   <Input id="my-input" aria-describedby="my-helper-text" />
   <FormHelperText id="my-helper-text">Please enter the full name.</FormHelperText>

   <InputLabel htmlFor="my-input">Professor type</InputLabel> {/*full time , adjecent*/}
   <Input id="my-input" aria-describedby="my-helper-text" />
   <FormHelperText id="my-helper-text">Ex. this professor .... </FormHelperText>


   <InputLabel htmlFor="my-input">Professor notes</InputLabel>
   <Input id="my-input" aria-describedby="my-helper-text" />
   <FormHelperText id="my-helper-text">Ex. this professor .... </FormHelperText>
</FormControl>


  </div>
}

export default AddProfessor