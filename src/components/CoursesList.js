import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { deleteCourse, getCourses } from '../API/courses';
import { useState ,useEffect} from 'react';
import { Button,Modal } from '@mui/material';
import toast from 'react-hot-toast';
function createData({course_name,course_code,course_majors,course_years,course_semesters,has_lab,course_type,course_notes,id}) {
  return {
    name:course_name,
code:course_code,
majors:course_majors,
years:course_years,
semesters:course_semesters,
lab:has_lab,
type:course_type,
notes:course_notes,
id:id
  };
}

const majorsMap={
    "1":"Electrical engineering",
    "2":"Robotics",
    "3":"Computer science"
 }
 
 const yearsMap={
    "1":"Freshman",
    "2":"Sophemore",
    "3":"Jenior",
    "4":"Senior"
 }
 
 const semestersMap={
    "1":"Fall",
    "2":"Winter",
    "3":"Summer"
 }
 const typesMap={
    "1":"online",
    "2":"inperson",
    "3":"async",
    "4":"online+inperson"
 }
 

function RenderMajors({majors}){
  return <>{majors.split("-").map(item=>{
    return <span style={{border:"1px solid rgb(100,100,100)",padding:"5px",margin:"5px"}}> {majorsMap[item]} </span>
  })}</>
}
function RenderYears({years}){
  return <>{years.split("-").map(item=>{
    return <span style={{border:"1px solid rgb(100,100,100)",padding:"5px",margin:"5px"}}> {yearsMap[item]} </span>
  })}</>
}

function RenderSemesters({semesters}){
  return <>{semesters.split("-").map(item=>{
    return <span style={{border:"1px solid rgb(100,100,100)",padding:"5px",margin:"5px"}}> {semestersMap[item]} </span>
  })}</>
}

function RenderLab({lab}){
  return <>{lab===0?"No":"Yes"}</>
}

function RenderType({type}){
    return <>{typesMap[type]}</>
}



function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Course name',
  },
  {
    id: 'code',
    numeric: false,
    disablePadding: false,
    label: 'Course code',
  },
  {
    id: 'majors',
    numeric: false,
    disablePadding: false,
    label: 'Course majors',
  },
  {
    id: 'years',
    numeric:false,
    disablePadding: false,
    label: 'Course years',
  },
  {
    id: 'semesters',
    numeric: false,
    disablePadding: false,
    label: 'Course semesters',
  },
  {
    id: 'lab',
    numeric: false,
    disablePadding: false,
    label: 'Has lab?',
  },
  {
    id: 'type',
    numeric: false,
    disablePadding: false,
    label: 'Course type',
  },
  {
    id: 'notes',
    numeric: false,
    disablePadding: false,
    label: 'Course notes',
  },
  {
    id: "Delete",
    numeric:false,
    label:"Delete course"  
  }
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%',marginTop:"20px" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Courses
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function CoursesList() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] =useState(5);

  const [rows,setRows]=useState([])
  const [visibleRows,setVisibleRows]=useState([])
 const loadCourses=async()=>{
    const courses= await getCourses()
    
    setRows(courses.map(course=>{
       return createData(course)
    }))

    setVisibleRows(stableSort(courses.map(course=>{
        return createData(course)
     }), getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ))
  }
  
  useEffect(()=>{
    loadCourses();
  
  },[order, orderBy, page, rowsPerPage,loadCourses])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property)
  };

  const handleSelectAllClick = (event) => {
    /*if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }*/
    setSelected([]);
  };

  const handleClick = (event, id) => {
    return ""
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const [open,setOpen]=useState(false)
  const [selected_id,setSelected_id]=useState(undefined)
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
    display:"flex",
    flexDirection:"column",
    gap:5
  };
  return (
    <Box sx={{ width: '100%' }}>
       <Modal
        open={open}
        onClose={()=>{setOpen(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete the course (this action will delete the 
            course from any schedule that use it )?
          </Typography>
          

           <Button
           variant='contained'
           color="error"
           onClick={
            async()=>{
             
                 try{
                  await deleteCourse(selected_id)
                  loadCourses();
                  toast.success("Class deleted")
                  
                 }catch(err){
                  toast.error("Error deleted the class")
                 
                 }
                 setOpen(false)
             }


           }
           >Delete</Button>
           <Button
           variant='contained'
           color="info"
           onClick={()=>{setOpen(false)}}
           >Cancel</Button>
          
        </Box>
      </Modal>

      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={0} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={0}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
               
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                 
                    tabIndex={-1}
                    key={row.id}
            
                    sx={{ cursor: 'pointer' }}
                  >
                  
                    <TableCell
                     style={{borderLeft:"1px solid black"}}
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.name}
                    </TableCell>

                    <TableCell  style={{borderLeft:"1px solid black"}} align="left">{row.code}</TableCell>
                    <TableCell  style={{borderLeft:"1px solid black"}} align="left"> <RenderMajors majors={row.majors}/></TableCell>
                    <TableCell  style={{borderLeft:"1px solid black"}} align="left"><RenderYears years={row.years}/> </TableCell>
                    <TableCell  style={{borderLeft:"1px solid black"}} align="left"><RenderSemesters semesters={row.semesters}/></TableCell>
                    <TableCell  style={{borderLeft:"1px solid black"}} align="left"><RenderLab lab={row.lab}/></TableCell>
                    <TableCell  style={{borderLeft:"1px solid black"}} align="left"><RenderType type={row.type}/></TableCell>
                    <TableCell   style={{borderLeft:"1px solid black"}} align="left">{row.notes}</TableCell>
                    <TableCell   style={{borderLeft:"1px solid black"}} align="left">
                      
                     <DeleteIcon onClick={()=>{
                      setOpen(true)
                      setSelected_id(row.id)
                     }} className="delete-icon"/>
                      
                      </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}