import './App.css';
import Axios from 'axios'
import React, { useEffect, useState } from "react";

function App() {
  //const [bookList,setBookList] = useState("");
  const [mem_name, setMemName] = useState("");
  const [type, setType] = useState("");
 
  const addMember = () => {
    Axios.post("http://localhost:3001/createAcc", {
      mem_name: mem_name,
      type: type,
    }).then(() => {
      console.log("success");
    });
  };


 /* const getBooks = () =>{
    Axios.get("http://localhost:3001/books").then((response) => {
      console.log(response);
    });
  }*/


  return (
    <div className="App">
      <h3>Account Details</h3>
      <div className="information">
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setMemName(event.target.value);
          }}
        />
             <br></br>
             <label>Account Type:</label>
             <p>
               D - Diamond<br></br>
               G - Gold<br></br>
               S - Silver<br></br>
             </p>
        <input
          type="text"
          onChange={(event) => {
            setType(event.target.value);
          }}
        />
      </div>
      <div className = "Books">

        <button onClick={addMember}>Add Member</button>
      </div>

    </div>
  );
}

export default App;
