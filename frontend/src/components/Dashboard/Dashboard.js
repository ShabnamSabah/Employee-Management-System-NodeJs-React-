import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link, Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
 const Dashboard = () => {
const navigate = useNavigate();
    const callAdminDashboard = async() =>{
        
        
            const res = await fetch('/dashboard',{
             method: "GET",
             headers:{
               Accept: "application/json",
               "Content-Type": "application/json"
             },
             credentials: "include"
            });
     
            const data = await res.json();
           if(res.status === 200){
            if(data.role === "admin"){
              navigate('/')
            }else{
                const id = data.id
               navigate('/employeedetail/'+id)
            }

           }else{
            navigate('/start')
           }
    
      }
      useEffect(()=>{
       callAdminDashboard();
      },[]);

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
    <div className="container-fluid">
    <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-5 d-none d-sm-inline">Admin Dashboard</span>
                </a>
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                
                    <li>
                        <Link to="/" data-bs-toggle="collapse" className="nav-link text-white px-0 align-middle">
                            <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Dashboard</span> </Link>
                       
                    </li>
                    <li>
                        <Link to="/employee" className="nav-link px-0 align-middle text-white">
                            <i className="fs-4 bi-table"></i> <span className="ms-1 d-none d-sm-inline">Manage Employee</span></Link>
                    </li>
                  
                   
                    <li>
                        <Link to="/profile" className="nav-link px-0 align-middle text-white">
                            <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Profile</span> </Link>
                    </li>
                    <li onClick={handleLogout}>
                        <Link to="#" className="nav-link px-0 align-middle text-white">
                            <i className="fs-4 bi-power"></i> <span className="ms-1 d-none d-sm-inline">Logout</span> </Link>
                    </li>
                </ul>
                
             
            </div>
        </div>
        <div className="col p-0 m-0">
			<div className='p-2 d-flex justify-content-center shadow'>
            <h4>Employee Management System</h4>
          </div>
          <Outlet />
        </div>
    </div>
</div>
  )
}

export default Dashboard