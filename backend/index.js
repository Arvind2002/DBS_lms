const express = require('express');
const app = express();
const mysql = require('mysql');
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

app.get("/", (req, res) => {
  const sqlInsert = "INSERT INTO books VALUES (2, 'alex rider', 'anthony horowitz', 'penguin');"
  db.query(sqlInsert, (err, result) => {
    res.send("hello world");
  });
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