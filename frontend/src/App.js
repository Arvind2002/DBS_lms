//need to check for valid account type
import './App.css';
import Axios from 'axios'
import React, { useEffect, useState } from "react"
import BasicTable from './components/BasicTable.js'
import {acc_columns} from './components/acc-columns'
import {book_columns} from './components/book-columns'

function App() {
  const [memName, setMemName] = useState("");
  const [type, setType] = useState("");
  const [memList, setMemList] = useState([]);
  const [mem_search_ID, setMemSearch] = useState([]); 

  /////////////////////////////////
  const addMember = () => {
    console.log("In addMember() function")
    if((type.toLowerCase() != "platinum") && (type.toLowerCase() != "gold") && (type.toLowerCase() != "silver") && (type.toLowerCase() != "bronze")){
      alert("Wrong account type!");
    }
    Axios.post("http://localhost:3001/create_acc", {
      memName: memName,
      type: type,
    }).then(() => {
      alert("Acount created!");
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
    let input = document.getElementById('searchbar').value
    input=input.toLowerCase();
    Axios.get("http://localhost:3001/search_members").then((response) => {
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
        <label><a href = "addMembers.js">Name:</a></label>
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
        <br></br>
        <br></br>
        <br></br>
        <input id="searchbar" type="text"
        name="search" placeholder="Search Accounts based on Name" onChange={(event) => {
          setMemName(event.target.value);
        }}/>
      </div>
    </div>
  );
}

export default App;