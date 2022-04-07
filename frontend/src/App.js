
//need to check for valid account type

import './App.css';
import Axios from 'axios'
import React, { useEffect, useState } from "react"
import {BasicTable} from './components/BasicTable'
import {acc_columns} from './components/acc-columns'
import {book_columns} from './components/book-columns'
//import {DATA} from './components/table-data.json'

function App() {
  const [accList,setAccList] = useState("");
  const [memName, setMemName] = useState("");
  const [type, setType] = useState("");
  const [mem_search_ID, setMemSearch] = useState(0); 

  /////////////////////////////////
  const addMember = () => {
    console.log("In addMember() function")
    Axios.post("http://localhost:3001/createAcc", {
      memName: memName,
      type: type,
    }).then(() => {
      console.log("successfully added");
    });
  };

 const getMembers = () =>{
    Axios.get("http://localhost:3001/members").then((response) => {
      setAccList(response.data);
    });
  }

  const searchMembers = () =>{
    console.log(mem_search_ID);
    Axios.put("http://localhost:3001/members_search",
    {mem_search_ID: mem_search_ID,
    }).then((response) => {
      setMemSearch(response.data);
    });
  }

  /*add return (
  <BasicTable columns={???} data={???}/>
  ) in between some divs to make the table work*/


  return (
    <div className="App">
      <h1>Library Management System</h1>
      <h3>Account Details</h3>

      <div className="Information">
        <label>Name:</label>
        <input
          type = "text"
          name = "memName"
          onChange={(event) => {
            setMemName(event.target.value);
          }}
        />

        <br></br>
        <label>Account Type:</label>
        <input
          type = "text"
          name = "typeName"
          onChange={(event) => {
            setType(event.target.value);
          }}
        />
      
        <button onClick={addMember}>Add Member</button>
        <button onClick={getMembers}>Show Members</button>

      </div>
    </div>
  );
}

export default App;