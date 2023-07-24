# Employee-Management-System-NodeJs-React-

This is Employee Manaagement System using Node Js and React where an admin can add employess and update the emoployee's salary. Admin also can view the list of admins, totail number of Employee and total salary of all Employees.

# To Run The Code Follow The Steps Below: 

### To Run The Frontend
1.  Open the client folder in VSCode and run the following command in the terminal to install the packages
```
npm install
```
2. Run the project by using the following Command
```
npm start
```

### To Run The Backend
1.  Open the client folder in VSCode and run the following command in the terminal to install the packages
```
npm install
```
2. Create the databse with a name in Xampp Server/MySQl Workbench
```
your database name
```

3. Create .env file in the project folder and add the following
```
DB_name = "your database name"
DB_user = "usernme of datatabse"
DB_password = 'database password'
JWT_SECRET = secret key for user authentication
```

4. Run the project by using the following command.
```
nodemon app.js
```
After that databse and admin will be created.

5. Open your browser and the following command
```
localhost:8000
```
6. As admin is predefined, So Login as Admin by using the following email and password.
   ```
   email: admin@gmail.com
   password: 12345
   ```

After login Admin can add a employee and update their salary.
Employe can login and view his/her details.
