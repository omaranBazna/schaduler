import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import dayjs from 'dayjs';
import moment from 'moment/moment';
import { getProfessorDetails } from '../API/professors';
import { getCourseDetails } from '../API/courses';
const majorsMap={
    1:"Electrical Eng.",
    2:"Robotics",
    3:"Computer Sci"
  }
const yearsMap={
    1:"First",
    2:"Second",
    3:"Third",
    4:"Fourth",
    5:"Grad"
  }
const semestersMap={
    1:"Fall",
    2:"Winter",
    3:"Summer"
}
  const times=[]
  function format(num){
    let str=num+""
    if(str.length==1){
        return "0"+str
    }
    return num
  }
  for(let h =8;h<=21;h++){
    for(let min=0;min<=45;min+=15){
        times.push(format(h)+":"+format(min));
    }
  }

  const cellsH = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    "AA", "AB", "AC", "AD", "AE", "AF", "AG", "AH", "AI", "AJ", "AK", "AL", "AM", "AN", "AO"
  ];
  
export const exportToExcelWithStyling = async (events, fileName) => {
 
  const workbook = new ExcelJS.Workbook();
  let sheetsData=[]
  for(let major of [1,2,3]){
        for(let semester of [1,2,3]){
            let data=["Time/Day"," "]
            let days=["Monday","Tuesday","Wensday","Thursday","Friday"]
            days=days.map(item=>[item," ",item," ",item," ",item," "])
            data.push(days.flat())
            data=data.flat()

           
            
            let row2=["","",
            ["Monday","Tuesday","Wensday","Thursday","Friday"].map(item=>{
                return ["FRESHMAN"," ","SOPHEMORE"," ","JENIOR"," ","SENIOR"," "]
            }).flat()
        ].flat()
         let table=[data,row2]
            for(let time of times){
                let remaining=new Array(data.length-1).fill("")
                let row=[time,...remaining]
                table.push(row)
            }   
           
            let merges=[]
            let styles={}
            for(let event of events){
           
                let minInd=1000
                let maxInd=-1;
                let index=2 + event.day * 8 +(event.year-1)*2
                if(event.major == major && event.semester == semester){
                  let row_index=2
                  for(let time of times){
                   
                    let startHour = dayjs(event.startDate).hour()
                    let startMin = dayjs(event.startDate).minute()

                    let endHour = dayjs(event.endDate).hour()
                    let endMin = dayjs(event.endDate).minute()
                    let h=time.split(":")[0]*1
                    let m=time.split(":")[1]*1         
                    if(h>=startHour&& m>=startMin && h<endHour && (h<endHour || m<endMin)){
                     let title="some title"
                     try{
                        let course=await getCourseDetails(event.course_id)
                        let professor=await getProfessorDetails(event.professor_id)
                        console.log(course)
                        console.log(professor)
                      table[row_index][index]=course.course_name+" "+professor.professor_name
                        if(row_index<minInd) minInd=row_index
                        if(row_index>maxInd) maxInd=row_index
                        
                        styles[row_index+" "+index]=JSON.parse(event.type)["value"]
                     }catch(err){

                     }
                    }
                  
                    row_index++;  
                }
              
  
                }
            if(maxInd>-1){
                let letter=cellsH[index]
                minInd++
                maxInd++
                merges.push([letter+minInd+":"+letter+maxInd])
            }

            }
            
            sheetsData.push(
                {
                    sheetName:majorsMap[major]+" "+semestersMap[semester],
                    data:table,
                    merges:merges,
                    styles
                }

            )
            
        
    }
  }


  
  // Iterate through sheets and add them to the workbook
  sheetsData.forEach(sheet => {
    const worksheet = workbook.addWorksheet(sheet.sheetName);
    sheet.data.forEach((row, rowIndex) => {
      const rowValues = [];
      for (const [key, value] of Object.entries(row)) {
        rowValues.push(value);
      }
      const excelRow = worksheet.addRow(rowValues);
      excelRow.eachCell((cell, colNumber) => {
       // if (sheet.styling && sheet.styling[rowIndex] && sheet.styling[rowIndex][colNumber - 1]) {
        if(colNumber==1){
       cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: "Ffffed" }
          };
        }else {
            let colors=["FFFFE0","90EE90","ADD8E6","FED8B1","CBC3E3","CFCFE0"]
            let colIndex=Math.ceil((colNumber-2)/8)
            let color
          
             color=colors[colIndex]
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: color }
              };
        }
        if(sheet.styles){
            let colorMap={
                0:"FF0000",
                1:"0000FF",
                2:"Ffa500"
            }
            for(let key in sheet.styles){
                let type=sheet.styles[key]
               
                key=key.split(" ")
                if(key[0]==rowIndex && key[1]==colNumber-1){
                     
                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: colorMap[type] }
                      };
                     cell.alignment = { wrapText: true };
                }
                
            }
    }
        

        //}
      });
    });
   
   if(sheet.merges){
     sheet.merges.forEach(merge=>{
        worksheet.mergeCells([merge])
     })
   }
    
  });

  // Generate Excel file and trigger a download
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/octet-stream' });
  saveAs(blob, `${fileName}.xlsx`);
};