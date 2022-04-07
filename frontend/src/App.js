//need to check for valid account type
import './App.css';
import Axios from 'axios'
import React, { useEffect, useState } from "react"
import BasicTable from './components/BasicTable.js'
import {acc_columns} from './components/acc-columns'
import {book_columns} from './components/book-columns'
//import {DATA} from './components/table-data.json'

function App() {
  const [memName, setMemName] = useState("");
  const [type, setType] = useState("");
  const [memList, setMemList] = useState([]);
  const [mem_search_ID, setMemSearch] = useState(0); 

  /////////////////////////////////
  const addMember = () => {
    console.log("In addMember() function")
    Axios.post("http://localhost:3001/create_acc", {
      memName: memName,
      type: type,
    }).then(() => {
      console.log("successfully added");
    });
  };

 const getMembers = () =>{
   console.log("In getMembers() function")
    Axios.get("http://localhost:3001/show_members").then((response) => {
      setMemList(response.data);
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

  const memData = React.useMemo(() => memList);
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
          name = "type"
          onChange={(event) => {
            setType(event.target.value);
          }}
        />
        
        <br></br>
        <button onClick={addMember}>Add Member</button>
        <br></br>
        <button onClick={getMembers}>Show Members</button>
        <br></br>
        <BasicTable columns={acc_columns} data={memData}/>

      </div>
    </div>
  );
}

export default App;