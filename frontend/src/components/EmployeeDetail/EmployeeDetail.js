import React from 'react'
import  { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
const EmployeeDetail = () => {
  const {id} = useParams();
    const navigate = useNavigate()
    const [employee, setEmployee] = useState([])

    const callEmployeeDetail = async() =>{
      const res = await fetch('/employee/'+id,{
        method: "GET",
        headers:{
         Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"

      })

      const data = await res.json()
      
      if(res.status === 400 || !data){
          console.log(data.error)
      }else{
        console.log(data)
        setEmployee(data)
      }
    }

    useEffect(()=>{
          callEmployeeDetail();
    },[])
    const handleLogout = ()=>{
      fetch('/logout',{
          method: "GET",
          headers:{
              Accept: "application/json",
              "Content-Type": "application/json"
          },
          credentials: "include"
      }).then(res=>{
          navigate('/start')
          if(!res.status === 200){
              const error = new Error(res.error);
              throw error;
             }
      }).catch(err=>{
          console.log(err);
      })
    }
  return (
    <div>
    <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
        <img src={`/uploads/`+employee.image} alt="" className='empImg'/>
        <div className='d-flex align-items-center flex-column mt-5'>
            <h3>Name: {employee.name}</h3>
            <h3>Email: {employee.email}</h3>
            <h3>Salary: {employee.salary}</h3>
        </div>
        <div>
            <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
        </div>
    </div>
</div>
  )
}
export default EmployeeDetail