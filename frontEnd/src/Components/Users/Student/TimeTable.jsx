import React, {useState} from 'react'

export default function TimeTable() {
  const [data , setData] = useState(JSON.parse(localStorage.getItem("userInfo")));    
  return (
    <>
        <center>
            <br />
            <h1>Time Table <br /> <b> {data.enrolled_course} {data.current_year} year, Department {data.department} </b></h1>
            <img src="" alt="" />
        </center>
    </>
  )
}
