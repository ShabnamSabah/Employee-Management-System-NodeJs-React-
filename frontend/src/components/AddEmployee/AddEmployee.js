import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

 const AddEmployee = () => {
  const navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        salary: '',
        sampleFile: ''
    })
    const handleSubmit = async(e)=>{
      e.preventDefault()
      const formdata = new FormData();
      formdata.append("name", data.name)
      formdata.append("email", data.email)
      formdata.append("password", data.password)
      formdata.append("address", data.address)
      formdata.append("salary", data.salary)
      formdata.append("sampleFile", data.sampleFile)

      const res = await fetch('/createEmployee',{
        method: "POST",
        // headers:{
        //     "Content-Type": "multipart/form-data"
        // },
        body: formdata
      })
      const data1 = await res.json()

      if(res.status === 400 || !data1){
         window.alert('Failure In Adding Employee')
         console.log(data1.error)
      }
      else{
        console.log(data1.message)
        navigate('/employee')
      }
    }
  return (
    <div className='d-flex flex-column align-items-center pt-4'>
			<h2>Add Employee</h2>
			<form className="row g-3 w-50" onSubmit={handleSubmit}>
			<div className="col-12">
					<label htmlFor="inputName" className="form-label">Name</label>
					<input type="text" className="form-control" id="inputName" placeholder='Enter Name'
                    onChange={e => setData({...data, name: e.target.value})}
					/>
				</div>
				<div className="col-12">
					<label htmlFor="inputEmail4" className="form-label">Email</label>
					<input type="email" className="form-control" id="inputEmail4" placeholder='Enter Email' 
                     onChange={e => setData({...data, email: e.target.value})}
					/>
				</div>
				<div className="col-12">
					<label htmlFor="inputPassword4" className="form-label">Password</label>
					<input type="password" className="form-control" id="inputPassword4" placeholder='Enter Password'
					 onChange={e => setData({...data, password: e.target.value})} />
				</div>
				<div className="col-12">
					<label htmlFor="inputSalary" className="form-label">Salary</label>
					<input type="text" className="form-control" id="inputSalary" placeholder="Enter Salary" 
							 onChange={e => setData({...data, salary: e.target.value})}/>
				</div>
				<div className="col-12">
					<label htmlFor="inputAddress" className="form-label">Address</label>
					<input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" 
					 onChange={e => setData({...data, address: e.target.value})}/>
				</div>
				<div className="col-12 mb-3">
					<label className="form-label" htmlFor="inputGroupFile01">Select Image</label>
					<input type="file" className="form-control" id="inputGroupFile01"
                onChange={e => setData({...data, sampleFile: e.target.files[0]})}/>
				</div>
				<div className="col-12">
					<button type="submit" className="btn btn-primary">Create</button>
				</div>
			</form>
		</div>
  )
}

export default AddEmployee
