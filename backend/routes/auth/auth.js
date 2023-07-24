const express = require("express");
const router = express.Router();
const db = require("../../config/database");
const User = require("../../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Employee = require("../../model/Employee");

//admin login
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ error: "Please fill The Data" });
      }
  
      const userLogin = await User.findOne({ where: { email: email } });
      console.log(userLogin)
      if (userLogin) {
  
        const isMatch = await bcrypt.compare(password, userLogin.password);
  
              const token = jwt.sign({
              id: userLogin.id,
              name: userLogin.name,
              email: userLogin.email,
              role: userLogin.role
            }, process.env.JWT_SECRET,{
                expiresIn: '1h'
            });
  
            res.cookie("jwttoken", token, {
              expires: new Date(Date.now() + 25892000000) , //30days
              httpOnly: true
            })
        if (!isMatch) {
         return res.status(400).json({ error: "Invalid Password" });
        } else {
          res.status(200).json({ Suceess: "Success" });
        }
       }else{
        return res.status(400).json({ error: "Invalid Credentials" });
      }
    }
    catch(err) {
      console.log(err)
    }
  })


  router.post('/employeeLogin', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ error: "Please fill The Data" });
      }
  
      const empLogin = await Employee.findOne({ where: { email: email } });
      console.log(empLogin)
      if (empLogin) {
  
        const isMatch = await bcrypt.compare(password, empLogin.password);
  
              const token = jwt.sign({
              id: empLogin.id,
              name: empLogin.name,
              email: empLogin.email,
              role: "employee"
            }, process.env.JWT_SECRET,{
                expiresIn: '1h'
            });
  
            res.cookie("jwttoken", token, {
              expires: new Date(Date.now() + 25892000000) , //30days
              httpOnly: true
            })
        if (!isMatch) {
         return res.status(400).json({ error: "Invalid Password" });
        } else {
          res.status(200).json({ Suceess: "Success", id: empLogin.id });
        }
       }else{
        return res.status(400).json({ error: "Invalid Credentials" });
      }
    }
    catch(err) {
      console.log(err)
    }
  })
  router.get('/logout', (req, res) => {
    res.clearCookie('jwttoken', {path: '/'});
    res.status(200).send('User Loged Out')
  }); 
module.exports = router