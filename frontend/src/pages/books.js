import '../App.css';
import Axios from 'axios'
import React, { useEffect, useState } from "react"
import BasicTable from '../components/BasicTable.js'
import {book_columns} from '../components/book-columns.js'  

const Books = () => {
    const [bookName, setBookName] = useState("");
    const [authName, setAuthName] = useState("");
    const [pubName, setPubName] = useState("");

    const addBooks = () =>{
        console.log("in addBooks() function");
    }

    return(
        <div>
            <h1>Books</h1>
            <h3>Book Details</h3>
            <div className = 'bookDetails'>
                <label>Book Name: </label>
                <input
                type = "text"
                name = "bookName"
                placeholder = "enter book name"
                onChange={(event) => {
                    setBookName(event.target.value);
                }}
                />

                <br></br>
                <label className='sucky'>Author Name: </label>
                <input
                type = "text"
                name = "authName"
                placeholder = "enter author name"
                onChange={(event) => {
                    setAuthName(event.target.value);
                }}
                />

                <br></br>
                <label>Publisher Name: </label>
                <input
                type = "text"
                name = "pubName"
                placeholder = "enter publisher name"
                onChange={(event) => {
                    setPubName(event.target.value);
                }}
                />

                <br></br>
                <button onClick={addBooks}>Add Book</button>
                <br></br>

            </div>
        </div>
    );
};

export default Books;