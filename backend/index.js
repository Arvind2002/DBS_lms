const express = require('express');
const app = express();
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
      "INSERT INTO members (memName, typeID) select ?,typeID from acType where typeName = ?",
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
  

app.get("/members", (req, res) => {
  db.query("SELECT memID,memName,typeName FROM members,acType where acType.typeID = members.typeID", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/members_search", (req, res) => {
  const mem_search_ID = req.body.mem_search_ID;
  console.log(mem_search_ID);
  db.query("SELECT memID,memName,typeName FROM members,acType where acType.typeID = members.typeID and memID = ?",[mem_search_ID], (err, result) => {
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