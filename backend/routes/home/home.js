const express = require("express");
const router = express.Router();
const db = require("../../config/database");
const User = require("../../model/User");
const Employee = require("../../model/Employee");
const { upload } = require('../../middleware/multerUpload');
const checkLogin = require('../../middleware/checkLogin');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


router.post('/createEmployee', upload.single('sampleFile'), (req,res)=>{
    let {name, email, password, address, salary} = req.body
    let picture = req.file.filename
    console.log(req.file)
    const newEmployee = new Employee({
        name,
        email,
        password,
        address,
        salary,
        image: picture
    })
      bcrypt.genSalt(10, (err, salt) =>
        bcrypt.hash(newEmployee.password, salt, (err, hash) => {
            if (err) throw err;
            //set password to hash
            newEmployee.password = hash;
            newEmployee.save()
                .then(employee => {
                    res.status(201).json({ message: " Employee Added Successfully " });
                })
                .catch(err => 
                    //console.log(err)
                    res.status(400).json({ error: "Faile To Add Employee" })
                );

        }))
})

router.get('/getEmployeList', async(req,res)=>{
    const employeeList = await Employee.findAll()
    if(employeeList){
       //return res.status(200).json({data: employeeList})
       res.send(employeeList)
    }else{
     res.status(400).json({ error: "No Employess"})
    }
})

router.get('/get/:id', async(req,res)=>{
    const employee = await Employee.findOne({where: { id: req.params.id}})
    if(employee){
       //return res.status(200).json({data: employeeList})
       res.send(employee)
    }else{
       res.status(400).json({ error: "No Employess"})
    }
})

router.put('/update/:id', async(req,res)=>{
    
    const { salary} = req.body
    const employee = await Employee.findOne({where: { id: req.params.id}})
    if(employee){
       // console.log(employee)
       //return res.status(200).json({data: employeeList})
       const updateEmployee = await Employee.update({
         salary
       },{
        where : {
            id: req.params.id
        }
       })
       if(updateEmployee){
        res.status(200).json({ message: "Employee Salary Updated"})
        //res.send(employee)
       }
       else{
        res.status(400).json({ error: "No Salary Updated"})
       }
    }else{
        res.status(400).json({ error: "No Employess"})
    }
})

router.get('/get/:id', async(req,res)=>{
    const employee = await Employee.findOne({where: { id: req.params.id}})
    if(employee){
       //return res.status(200).json({data: employeeList})
       res.send(employee)
    }else{
       res.status(400).json({ error: "No Employess"})
    }
})

router.delete('/delete/:id', async(req,res)=>{
    
    
    const employee = await Employee.findOne({where: { id: req.params.id}})
    if(employee){
       // console.log(employee)
       //return res.status(200).json({data: employeeList})
       const deleteEmployee = await Employee.destroy({where : {id: req.params.id}})
       if(deleteEmployee){
        res.status(200).json({ message: "Employee Deleted Suceessfully"})
        //res.send(employee)
       }
       else{
        res.status(400).json({ error: "No Employee Deleted"})
       }
    }else{
        res.status(400).json({ error: "No Employess"})
    }
})


//admin dashboard

router.get('/dashboard', checkLogin, (req,res)=>{
 res.status(200).json({ Status: "Success", role: req.role, id: req.id})
})


//AdminCount
router.get('/adminCount', async(req,res)=>{
    const {count, rows} = await User.findAndCountAll();
    if(count){
        //console.log(typeof(count))
        //console.log(rows)
     // res.send(count+"")
     res.json({
        count: count+"",
        rows: rows
     })
    }else{
       return res.status(400).json({error : "No Admin Found"})
    }
    
})


//employeeCount
router.get('/employeeCount',  async(req,res)=>{
    const {count, rows} = await Employee.findAndCountAll();
    if(count){
        console.log(count)
       // res.send(count.toString())
       res.send(count+"")
    }else{
        return res.status(400).json({error : "No Employee Found"})
    }
    
})

router.get('/salaryCount',  async(req,res)=>{
    const sumSalary = await Employee.sum('salary');
    if(sumSalary){
        console.log(sumSalary)
       // res.send(count.toString())
       res.send(sumSalary+"")
    }else{
        return res.status(400).json({error : "No Salary Found"})
    }
    
})

router.get('/employee/:id', async(req,res)=>{
    const employee = await Employee.findOne({where: { id: req.params.id}})
    if(employee){
       //return res.status(200).json({data: employeeList})
       res.send(employee)
    }else{
       res.status(400).json({ error: "No Employess"})
    }
})

module.exports = router