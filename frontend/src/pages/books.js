import '../App.css';
import Axios from 'axios'
import React, { useEffect, useState } from "react"
import BasicTable from '../components/BasicTable.js'
import {book_columns} from '../components/book-columns.js'  

const Books = () => {
    const [bookName, setBookName] = useState("");
    const [authName, setAuthName] = useState("");
    const [pubName, setPubName] = useState("");
    const [genre, setGenre] = useState("");
    const [deleteID,setBookDeleteID] = useState(0);
    const [bookSearchName, setBookSearchName] = useState("");
    const [bookSearchNameList, setMemSearchList] = useState([]);

    const addBooks = () =>{
        console.log("in addBooks() function");
        Axios.post("http://localhost:3001/add_book", {
            bookName: bookName,
            authName: authName,
            pubName: pubName,
            genre: genre
        }).then(() => {
            console.log("successfully added!");
        });
        document.getElementById("addBook").value = "";
        document.getElementById("addAuth").value = "";
        document.getElementById("addPub").value = "";
        document.getElementById("addGenre").value = "";
    }

    const searchBooks = () =>{
        console.log("in searchBooks() function");
        console.log(bookSearchName)
        Axios.get("http://localhost:3001/search_books",{
            params:
            {bookName: bookSearchName}
        }).then((response) => {
            setMemSearchList(response.data);
        });
        console.log(bookSearchNameList);
        document.getElementById("searchName").value = "";

    }

    const deleteBook = () => {
        Axios.post("http://localhost:3001/del_book", {
            deleteID: deleteID,
        }).then(() => {
            alert("Book deleted!");
            console.log("successfully deleted");
        });
        document.getElementById("delID").value = "";

    };

    const searchBookData = React.useMemo(()=> bookSearchNameList);

    return(
        <div>
            <h1>Books</h1>
            <h3>Book Details</h3>
            <div className = 'Add'>
                <label>Book Name: </label>
                <input
                type = "text"
                name = "bookName"
                id = "addBook"
                placeholder = "enter book name"
                onChange={(event) => {
                    setBookName(event.target.value);
                }}
                />

                <br></br>
                <label>Author Name: </label>
                <input
                type = "text"
                name = "authName"
                id = "addAuth"
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
                id = "addPub"
                placeholder = "enter publisher name"
                onChange={(event) => {
                    setPubName(event.target.value);
                }}
                />

                <br></br>
                <label>Genre: </label>
                <input
                type = "text"
                name = "genre"
                id = "addGen"
                placeholder = "enter genre"
                onChange={(event) => {
                    setGenre(event.target.value);
                }}
                />

                <br></br>
                <button onClick={addBooks}>Add Book</button>
                <br></br>
            </div>

            <div className='Search'>
                <br></br>
                <h3>Search Books</h3>
                <label>Search Book: </label>
                <input
                    type = "text"
                    name = "bookSearchName"
                    id = "searchName"
                    placeholder = "enter book name"
                    onChange={(event) => {
                        setBookSearchName(event.target.value);
                    }}
                />
                <br></br>
                <button onClick={searchBooks}>Search</button>
                <br></br>
                <br></br>
                <BasicTable columns={book_columns} data= {searchBookData}/>
                <br></br>
            </div>
            
            <div className='Delete'>
                <br></br>
                <h3>Delete Book</h3>
                <label>Book ID: </label>
                <input
                    type = "text"
                    name = "bookID"
                    id = "delID"
                    placeholder = "enter book ID"
                    onChange={(event) => {
                        setBookDeleteID(event.target.value);
                    }}
                />
                <br></br>
                <button onClick={deleteBook}>Delete Book</button>
                <br></br>
            </div>  
        </div>
    );
};

export default Books;