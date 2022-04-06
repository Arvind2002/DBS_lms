const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors")

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'Arvind@2002',
    database:'library',
});
console.log("connection created");

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