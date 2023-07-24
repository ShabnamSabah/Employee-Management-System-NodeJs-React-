import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Employee = () => {
  const [data, setData] = useState([])
  const callEmployee = async()=>{
   try{
    const res = await fetch('/getEmployeList',{
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data1 = await res.json();
    console.log(data1);
    setData(data1)
    
    if(!res.status === 200){
    const error = new Error(res.error)
    throw error
    }
   }
  catch(err){
      console.log(err)
  }
  }
  useEffect(()=>{
    callEmployee();
  },[])

 
   const handleDelete = async(id) =>{
     
      const res = await fetch('/delete/'+id, {
        method: "DELETE",
    
      })
      const data2 =  await res.json()

      if(res.status === 400 || !data2){
         window.alert(data2.error)
      }else{
        //window.alert(data2.message)
        window.location.reload()
      }

   }

  return (
    <div className='px-5 py-3'>
      <div className="d-flex justify-content-center">
        <h2>Employee List</h2>
      </div>
      <div className="mt-3">
      <table className='table'>
        <thead>
          <tr>
            <td>Name</td>
            <td>Image</td>
            <td>Email</td>
            <td>Address</td>
            <td>Salary</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          
           {data.map((employee,index)=>(
             <tr key={index}>
                <td>{employee.name}</td>
                <td>{
                  <img src={`/uploads/`+ employee.image} alt="" className='employee_image'/>
                  
                  }</td>
                <td>{employee.email}</td>
                <td>{employee.address}</td>
                <td>{employee.salary}</td>
                <td>
                  <Link to={`/editEmployee/`+ employee.id} className='btn btn-primary btn-sm me-2'>Edit</Link>
                  <button onClick={e=>handleDelete(employee.id)} className='btn btn-sm btn-danger'>Delete</button>
                </td>
             </tr>
           ))}

         
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default Employee