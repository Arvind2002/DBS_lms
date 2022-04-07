
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
  const [mem_name, setMemName] = useState("");
  const [type, setType] = useState("");
  const [mem_search_ID, setMemSearch] = useState(0); 
 
  const addMember = () => {
    console.log("In add member")
    Axios.post("http://localhost:3001/createAcc", {
      mem_name: mem_name,
      type: type,
    }).then(() => {
      console.log("success");
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
               Diamond<br></br>
               Gold<br></br>
               Silver<br></br>
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
      <br></br>
      <br></br>
      <div className = "Books">
        <button onClick={getMembers}>Show Members</button>
      </div>
      
      <div>
        <br></br>
        <h4>Search for member</h4>
        <label>ID:</label>
        <input
          type="number"
          onChange={(event) => {
            setMemSearch(event.target.value);
          }}
        />
      </div>
      <div className = "Books">
        <button onClick={searchMembers}>Search Members</button>
      </div>
    </div>
  );
}

export default App;