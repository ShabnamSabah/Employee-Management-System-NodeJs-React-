const jwt = require('jsonwebtoken');
const User = require('../model/User'); // admin table

const checklogin = (req, res, next) =>{
const token = req.cookies.jwttoken;
  try{
   //const token = authorization.split(" ")[1];
     const decoded = jwt.verify(token, process.env.JWT_SECRET);
     const {id, name, email, role} = decoded;

     req.id = id;
     req.name = name;
     req.email = email;
     req.role = role;
    // req.user = user;
     next();
  }
  catch (err){
    return res.status(400).json({error : 'UnAuthorized:No Token Provided'});
     // console.log(err);
      
  }


}

module.exports = checklogin;