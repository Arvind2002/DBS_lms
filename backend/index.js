const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mysql = require('mysql');
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

const db = mysql.createPool({
  host: 'localhost',
  user: 'root', 
  password: 'password',
  database: 'library',
});

app.post("/create_acc", (req, res) => {
  const mem_name = req.body.memName;
  const type = req.body.type;
  const sqlInsert = "INSERT INTO members (memName, typeID) select ?, typeID from acType where typeName = ?";

  db.query(
    sqlInsert,
    [mem_name, type],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    }
  );
});

app.post("/update_acc", (req, res) => {
  const id = req.body.updateID;
  const name = req.body.updateName;
  const type = req.body.updateType;
  const sqlInsert = "update members set memName = ?, typeID = ? where memID = ?";
  db.query(
    sqlInsert,
    [name, type,id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    }
  );
});  

app.post("/delete_acc", (req, res) => {
  const deleteID = req.body.deleteID;
  const sqlInsert = "delete from members where memID = ?";

  db.query(
    sqlInsert,
    [deleteID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    }
  );
});  

app.get("/search_members", (req, res) => {
  const name = req.query.accName;
  const sym = "%";
  const checkName = sym.concat(name,sym);
  const sqlInsert = "SELECT memID, memName, typeName FROM members, acType where acType.typeID = members.typeID and memName like?";

  db.query(
    sqlInsert,
    [checkName],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/add_book", (req, res) => {
  const book_name = req.body.bookName;
  const auth_name = req.body.authName;
  const pub_name = req.body.pubName;
  const genre = req.body.genre;
  const sqlInsert = "INSERT INTO books (title, author, publisher, genre) values (?, ?, ?, ?);"

  db.query(
    sqlInsert,
    [book_name, auth_name, pub_name, genre],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    }
  );
});

app.get("/search_books", (req, res) => {
  const name = req.query.bookName;
  const sym = "%";
  const checkName = sym.concat(name, sym);
  const sqlInsert = "SELECT bookID, title, author, publisher, books.genre, hall, shelf FROM books, locations where books.genre = locations.genre and title like ?";

  db.query(
    sqlInsert,
    [checkName],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/del_book", (req, res) => {
  const deleteID = req.body.deleteID;
  const sqlInsert = "delete from books where bookID = ?";

  db.query(
    sqlInsert,
    [deleteID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    }
  );
});  

app.listen(3001, () => {
    console.log("Server running on port 3001");
});