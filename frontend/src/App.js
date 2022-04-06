import './App.css';
import Axios from 'axios'
import React, { useEffect, useState } from "react";

function App() {
  const [bookList,setBookList] = useState("");

  const getBooks = () =>{
    Axios.get("http://localhost:3001/books").then((response) => {
      console.log(response);
    });
  }

  return (
    <div className="App">
      <div className = "Books">

        <button onClick={getBooks}>Go to 3001/books</button>
      </div>
    </div>
  );
}

export default App;
