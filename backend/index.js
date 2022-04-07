const express = require('express');
const app = express();
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require('mysql2');
const cors = require("cors")

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: 'localhost',
  user: 'root', 
  password: 'password',
  database: 'library',
});
console.log("connection created"); 

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post("/createAcc", (req, res) => {
    const mem_name = req.body.mem_name;
    const type = req.body.type;
  
    db.query(
      "INSERT INTO members (name, typeID) VALUES (?,(select typeID from acType where typeName = ?))",
      [mem_name, type],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values Inserted");
        }
      }
    );
  });
  

app.get("/books", (req, res) => {
  db.query("SELECT * FROM books", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});