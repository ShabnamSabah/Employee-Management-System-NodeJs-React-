import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

const EditEmployee = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
        email: '',
        //password: '',
        address: '',
        salary: '',
        // sampleFile: ''
    })
    const {id} = useParams();
    const callEditEmployee = async()=>{
        try{
           const res = await fetch('/get/'+ id,{
             method: "GET",
             headers:{  
               
                "Content-Type": "application/json"
             },
            
           })
          const data1 = await res.json();
          console.log(data1)
          setData({...data, 
            name: data1.name,
            email: data1.email,
            address: data1.address,
            salary: data1.salary,

          })
          
          if(!res.status === 200) {
          const error = new Error(res.error);
          throw error;
          }
        }catch(err){
        console.log(err)
        }
    }
    useEffect(()=>{
        callEditEmployee();
    }, [])


    const handleSubmit = async(e)=>{
      e.preventDefault();

      const {name, email, address, salary} = data
      const res = await fetch('/update/'+id,{
        method: "PUT",
        headers:{
           
            "Content-Type": "application/json"
        },
        
        body: JSON.stringify({
            name,
            email,
            address, 
            salary
        })
      })
      const data1 = await res.json()

      if(res.status === 400 || !data1){
         window.alert(data1.error)
        // console.log(data1.error)
      }
      else{
        // console.log(data1.message)
        //window.alert(data1.message)
        navigate('/employee')
      }
    }
  return (
    <div className='d-flex flex-column align-items-center pt-4'>
			<h2>Edit Employee</h2>
			<form className="row g-3 w-50" onSubmit={handleSubmit}>
			<div className="col-12">
					<label htmlFor="inputName" className="form-label">Name</label>
					<input type="text" className="form-control" id="inputName" placeholder='Enter Name'
                    onChange={e => setData({...data, name: e.target.value})} value={data.name}
					/>
				</div>
				<div className="col-12">
					<label htmlFor="inputEmail4" className="form-label">Email</label>
					<input type="email" className="form-control" id="inputEmail4" placeholder='Enter Email' 
                     onChange={e => setData({...data, email: e.target.value})} value={data.email}
					/>
				</div>
				{/* <div className="col-12">
					<label htmlFor="inputPassword4" className="form-label">Password</label>
					<input type="password" className="form-control" id="inputPassword4" placeholder='Enter Password'
					 onChange={e => setData({...data, password: e.target.value})} />
				</div> */}
				<div className="col-12">
					<label htmlFor="inputSalary" className="form-label">Salary</label>
					<input type="text" className="form-control" id="inputSalary" placeholder="Enter Salary" 
							 onChange={e => setData({...data, salary: e.target.value})} value={data.salary}/>
				</div>
				<div className="col-12">
					<label htmlFor="inputAddress" className="form-label">Address</label>
					<input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" 
					 onChange={e => setData({...data, address: e.target.value})} value={data.address}/>
				</div>
				{/* <div className="col-12 mb-3">
					<label className="form-label" htmlFor="inputGroupFile01">Select Image</label>
					<input type="file" className="form-control" id="inputGroupFile01"
                onChange={e => setData({...data, sampleFile: e.target.files[0]})}/>
				</div> */}
				<div className="col-12">
					<button type="submit" className="btn btn-primary">Update</button>
				</div>
			</form>
		</div>
  )
}

export default EditEmployee