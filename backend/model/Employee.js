const Sequelize = require('sequelize');
const db= require('../config/database');


//creating model

//Admin
const Employee = db.define('employees',{
name:{
type: Sequelize.STRING

},
email:{
    type: Sequelize.STRING
    
},

password:{
    type: Sequelize.STRING
},
salary:{
    type: Sequelize.STRING
},
address:{
    type: Sequelize.STRING
},
image:{
    type: Sequelize.STRING
}},
{
    timestamps:false
});    



module.exports= Employee;
