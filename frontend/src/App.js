import './App.css';
import Axios from 'axios';
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

//pages + components
import Navbar from './components/Navbar';
import Accounts from './pages/accounts';
import Books from './pages/books';
import Home from './pages/home';
import Rooms from './pages/rooms';
import Issue from './pages/issue';

function App() {
  const [memName, setMemName] = useState("");
  const [deleteID,setMemDeleteID] = useState(0);
  const [type, setType] = useState("");
  //const [memList, setMemList] = useState([]);
  const [memSearchName, setMemSearchName] = useState("");
  const [memSearchNameList, setMemSearchList] = useState([]); 


  const addMember = () => {
    console.log("In addMember() function")
    if((type.toLowerCase() !== "platinum") && (type.toLowerCase() !== "gold") && (type.toLowerCase() !== "silver") && (type.toLowerCase() !== "bronze")){
      alert("Wrong account type!");
    }
    Axios.post("http://localhost:3001/create_acc", {
      memName: memName,
      type: type,
    }).then(() => {
      console.log("successfully added!");
    });
  };

  const deleteMember = () => {
  Axios.post("http://localhost:3001/delete_acc", {
    deleteID: deleteID,
  }).then(() => {
    alert("Account deleted!");
    console.log("successfully deleted");
  });
};

  const searchMembers = () =>{
    console.log(memSearchName)
    Axios.get("http://localhost:3001/search_members",{
      params:
      {accName: memSearchName}
    }).then((response) => {
      setMemSearchList(response.data);
    });
    console.log(memSearchNameList);
  }

  //const memData = React.useMemo(() => memList);
  const searchAccData = React.useMemo(()=>memSearchNameList);
  
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route element = {<Home />} path = "/" />
        <Route element = {<Accounts />} path = "/accounts" />
        <Route element = {<Books />} path = "/books" />
        <Route element = {<Rooms />} path = "/rooms" />
        <Route element = {<Issue />} path = "/issue" />
      </Routes>
    </div>
  );
}

export default App; 