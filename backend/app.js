const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
app.use(express.json()); // parse the data to json
const User = require("./model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


var cookieParser = require('cookie-parser')
app.use(cookieParser());

app.use(cors(
 { 
  origin: "",
  methods: ["POST", "GET", "PUT"],
  Credentials:  true
 }
));

const home = require('./routes/home/home')
const auth = require('./routes/auth/auth')
// Database
const db = require('./config/database');

const { allowedNodeEnvironmentFlags } = require('process');



// Test DB
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))

  //Model Synchrization With Database
  //db.sync({alter:{drop: false}})
  db.sync()
  .then((result) => {
      //console.log(result);
      User.findOne({
        where: {id: 1}
       })
       .then(user=>{
          if(!user){
            const newUser = new User({

              name: 'admin',
              email: 'admin@gmail.com',
              password: '12345',
              role:"admin"
      
            })
      
                //Hash Password
                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        //set password to hash
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                //req.flash('success_msg', 'You Are Registered Succesfully');
                                //res.redirect('/auth/login');
                              console.log('Admin Created')
                              
                            })
                            .catch(err => console.log(err));
      
                    }))

          }else{
            console.log('Admin Already Added')
          }

       })
    })
  .catch((err) => {
      console.log(err);
  })






// application level middleware


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, './public')
// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.use('/', home);
app.use('/', auth);


const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));