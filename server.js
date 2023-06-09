const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const router = express.Router();
const app = express();
app.use(express.json())
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "lms",
    
});

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to database");
    }
});

/*Here i get all data from the database */

app.get("/", (req, res) => {
    const sql = "SELECT * FROM user";
    db.query(sql, (err, data) => {
        if (err) {
            return res.json("Error");
        } else {
            return res.json(data);
        }
    });
});

/*-----End of the Display data-----*/

/*This function Yosra made it to check if the email and password exist in the database*/

app.post('/login',(req, res)=>{
    const sql="SELECT * FROM user WHERE `Email` = ? AND `Password` = ? ";
    db.query( sql,[req.body.email,req.body.password], (err, data) => {
        if (err) {
            return res.json("error");
        }
        if(data.length>0){
            console.log(req.body.email);
            console.log(data.lenght);
            console.log(req.body.password);
            return res.json("succ"); 
        }
        else{
            return res.json("WRONG EMAIL or PASS");  
        }
    });
});

/*-----End of check the password and email-----*/

/*This is for add user for the database*/
app.post('/create', (req, res) => {
    const sql = "INSERT INTO user (name, email, password, phone, status, type) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.phone,
        req.body.status,
        req.body.type
    ];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.log(err);
            return res.json("Error");
        } else {
            console.log(result);
            return res.json("User created successfully");
        }
    });
});

/*-----End of the add user -----*/

/*This is for update user (using his id)*/
app.put('/update/:id', (req, res) => {
    const sql = "UPDATE user SET `Name` =? , `Email` =? ,`Password` =? ,`Phone` =? ,`Status` =? ,`Type` =?  WHERE ID =? ";
    const values =[
        req.body.Name,
        req.body.Email,
        req.body.Password,
        req.body.Phone,
        req.body.Status,
        req.body.Type
    ]
    const id=req.params.id;
    db.query(sql,[...values,id], (err, data) => {
        if (err) {
            console.log(err);
            return res.json("Error");
        }
        return res.json(data);
    });
});

/*-----End of Update user-----*/

/*This is for delete User (using his id)*/ 

app.delete('/user/:id', (req, res) => {
    const sql = "DELETE FROM user WHERE ID =? ";
    const id=req.params.id;
    db.query(sql,[id], (err, data) => {
        if (err) {
            console.log(err);
            return res.json("Error");
        }
        return res.json(data);
    });
});

/*-----End of Delete user-----*/

app.listen(8081, () => {
    console.log("listening on port 8081");
});
