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
  dateStrings: 'date',
  //multipleStatements: true
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

app.get("/show_rooms", (req, res) => {
  const sqlInsert = "SELECT * from rooms";

  db.query(
    sqlInsert,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res);
        res.send(result);
      }
    }
  );
});

app.post("/book_room", (req, res) => {
  const roomID =  req.body.roomID;
  const memID = req.body.memID;
  const hour = req.body.hour;
  const q1 = "select memID from reservations where roomID = ? and hour = ?";
  const q2 = "insert into reservations values (?,?,?)";
  var bookedHour = 0;
  bookedHour = db.query(
    q1,[roomID,hour],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res);
      }
    }
  );

  if(bookedHour != null){
    db.query(
      q2,[roomID,memID,hour],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(res);
        }
      }
    );
  }
  else{
    console.log("duplicate");
  }
});

app.get("/show_reservations", (req, res) => {
  const sqlInsert = "SELECT members.memId,memName,roomName, reservations.hour,startTime,endTime from reservations,members,rooms,timings where reservations.memID = members.memID and rooms.roomID = reservations.roomID and reservations.hour = timings.hour ";
  db.query(
    sqlInsert,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send(result);
      }
    }
  );
});


app.post("/delete_reservations", (req,res) => {
  const roomID = req.body.roomID;
  const memID = req.body.memID;
  const hour = req.body.hour;
  console.log(roomID,memID,hour);
  const q1 = "delete from reservations where roomID = ? and memID = ? and hour = ?";
  db.query(
    q1,[roomID,memID,hour],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
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

app.get("/show_issues",(req,res) => {
  const id = req.query.memID;
  const query = "select members.memID, memName, title, author, dateOfIssue, (DATE_ADD(dateOfIssue, INTERVAL 7*duration DAY)) as dateOfReturn from issued, members, books, acType where issued.bookID = books.bookID and acType.typeID = members.typeID and issued.memID = members.memID and issued.memID = ?";

  db.query(
    query,[id],
    (err,result) => {
      if(err) {
        console.log(err);
      }
      else{
        res.send(result);
        console.log(result);
      }
    }
  );
});

app.get("/calc_dues",(req,res) => {
  const memID = req.query.memID;
  const bookID = req.query.bookID;
  const query = "select members.memID, memName, title, author, dateOfIssue, (DATE_ADD(dateOfIssue, INTERVAL 7*duration DAY)) as dateOfReturn from issued, members, books, acType where issued.bookID = books.bookID and acType.typeID = members.typeID and issued.memID = members.memID and issued.memID = ?";

  db.query(
    query,[id],
    (err,result) => {
      if(err) {
        console.log(err);
      }
      else{
        res.send(result);
        console.log(result);
      }
    }
  );
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});