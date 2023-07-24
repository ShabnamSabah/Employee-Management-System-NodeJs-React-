import React, { useEffect, useState } from 'react'

 const Home = () => {
  const [adminCount, setAdminCount] = useState('')
  const [employeeCount, setEmployeeCount] = useState('')
  const [salaryCount, setSalaryCount] = useState('')
  const [admin , setAdmin]=useState([])
  const callAdminCount=async()=>{
   
    try{
      const res = await fetch('/adminCount',{
        method: "GET",
        headers: {
          //Accept: "application/json",
          "Content-Type": "application/json"
        },
       // credentials: true
      })

      const data = await res.json();
      console.log(data);
      setAdminCount(data.count)
      setAdmin(data.rows)

      
      
      if(!res.status === 200){
      const error = new Error(data.error)
      throw error
      }
     
   }catch(err){
    console.log(err)
   }
  

  }

  const callEmployeeCount=async()=>{
   
    try{
      const res = await fetch('/employeeCount',{
        method: "GET",
        headers: {
          //Accept: "application/json",
          "Content-Type": "application/json"
        },
       // credentials: true
      })

      const data = await res.json();
      console.log(data);
      setEmployeeCount(data)

      
      
      if(!res.status === 200){
      const error = new Error(data.error)
      throw error
      }
     
   }catch(err){
    console.log(err)
   }
  

  }

  const callSalaryCount=async()=>{
   
    try{
      const res = await fetch('/salaryCount',{
        method: "GET",
        headers: {
          //Accept: "application/json",
          "Content-Type": "application/json"
        },
       // credentials: true
      })

      const data = await res.json();
      console.log(data);
      setSalaryCount(data)

      
      
      if(!res.status === 200){
      const error = new Error(data.error)
      throw error
      }
     
   }catch(err){
    console.log(err)
   }
  

  }
  
  useEffect(()=>{
      callAdminCount();
      callEmployeeCount();
      callSalaryCount();
  },[])
  return (
    <div>
    <div className='p-3 d-flex justify-content-around mt-3'>
      
      <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Admin</h4>
          </div>
          <hr />
          <div className=''>
            <h5>Total: {adminCount}</h5>
          </div>
        </div>

        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Employee</h4>
          </div>
          <hr />
          <div className=''>
            <h5>Total: {employeeCount}</h5>
          </div>
        </div>
    
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Salary</h4>
          </div>
          <hr />
          <div className=''>
            <h5>Total: {salaryCount}</h5>
          </div>
        </div>
    
      
    
    </div>
    
      {/* List of admin  */}
      <div className='mt-4 px-5 pt-3'>
        <h3>List of Admins</h3>
        <table className='table'>
          <thead>
            <tr>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            
              {admin.map((ad, index)=>(
               <tr  key={index}>
                  <td>{ad.name}</td>
                  <td>{ad.email}</td>
                </tr>
              )) }
              
            
          </tbody>
        </table>
      </div>
      </div>
  )
}

export default Home