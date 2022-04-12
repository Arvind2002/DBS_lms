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
  const [memSearchName, setMemSearchName] = useState("");
  const [memSearchNameList, setMemSearchList] = useState([]); 

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
      alert("Account created!");
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
    console.log(memSearchName)
    Axios.get("http://localhost:3001/search_members",{
      params: 
      {accName: memSearchName}
    })
    .then((response) => {
      setMemSearchList(response.data);
    });
    console.log(memSearchNameList);
  }

  /*add return (
  <BasicTable columns={???} data={???}/>
  ) in between some divs to make the table work*/

  const memData = React.useMemo(() => memList);
  const searchAccData = React.useMemo(()=>memSearchNameList);
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
        <br></br>
        <BasicTable columns={acc_columns} data={memData}/>
        <br></br>
        <br></br>
        <br></br>
        <label>Search Account:</label>
        <input
          type = "text"
          name = "memSearchName"
          placeholder = "Enter Name of member"
          onChange={(event) => {
            setMemSearchName(event.target.value);
          }}
        />
        <br></br>
        <button onClick={searchMembers}>Search</button>
        <br></br>
        <br></br>
        <BasicTable columns={acc_columns} data={searchAccData}/>
        <br></br>
      </div>
    </div>
  );
}

export default App;