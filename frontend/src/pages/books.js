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

                <label>Author Name: </label>
                <input
                type = "text"
                name = "authName"
                placeholder = "enter book name"
                onChange={(event) => {
                    setAuthName(event.target.value);
                }}
                />

                <label>Publisher Name: </label>
                <input
                type = "text"
                name = "pubName"
                placeholder = "enter book name"
                onChange={(event) => {
                    setPubName(event.target.value);
                }}
                />


            </div>
        </div>
    );
};

export default Books;