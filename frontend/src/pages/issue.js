import '../App.css';
import Axios from 'axios'
import React, { useEffect, useState } from "react"
import BasicTable from '../components/BasicTable.js'
import {issued_columns} from '../components/issued-columns.js'

const Issue = () => {
    const [issueMemID, setIssueMemID] = useState(0);
    const [issueList, setIssueList] = useState([]);
    const [dueMemID, setDueMemID] = useState(0);
    const [dues, setDues] = useState(0);
    const [retID, setRetID] = useState(0);
    const [newIssueMemID, setNewIssueMemID] = useState(0);
    const [newIssueBookID, setNewIssueBookID] = useState(0);


    
    const showIssues = () =>{
        Axios.get("http://localhost:3001/show_issues",{
            params:
            {memID: issueMemID}
        }).then((response) => {
            setIssueList(response.data);
        });
        document.getElementById("issueID").value = "";
    }

    const newIssue = () =>{
        Axios.post("http://localhost:3001/issue",{bookID: newIssueBookID, memID: newIssueMemID
        }).then((response) => {
            alert(response);
        });
        document.getElementById("newMem").value = "";
        document.getElementById("newBook").value = "";

    }

    const returnBook = () =>{
        Axios.post("http://localhost:3001/ret_books",{bookID: retID
        }).then((response) => {

        });
        document.getElementById("retID").value = "";
    }

    const calcDues = () =>{
        Axios.get("http://localhost:3001/calc_dues",{
            params:
            {   
                memID: dueMemID,
            }
        }).then((response) => {
            console.log(response.data[0].due);
            setDues(response.data[0].due);
            console.log(dues)
            //console.log(dues);
            if(response.data[0].due>0)
                document.getElementById("dues").value = response.data[0].due;
            else
                document.getElementById("dues").value = 0;

        });
    }

    const showAllIssues = React.useMemo(()=>issueList);

    return(
        <div>
            <h1>Issue books</h1>
            <label>Enter member ID: </label>
            <input
                    type = "text"
                    name = "memID"
                    id = "newMem"
                    placeholder = "enter member ID"
                    onChange={(event) => {
                        setNewIssueMemID(event.target.value);
                    }}
                />
            <br></br>
            <label>Enter book ID: </label>
            <input
                    type = "text"
                    name = "memID"
                    id = "newBook"
                    placeholder = "enter book ID"
                    onChange={(event) => {
                        setNewIssueBookID(event.target.value);
                    }}
                />
            <br></br>
            <button onClick={newIssue}>Issue Book</button>
            <br></br>
            <br></br>
            <br></br>
            <h3>Books Issued by a Member</h3>
            <br></br>
            <label>Enter member ID: </label>
            <input
                    type = "text"
                    name = "memID"
                    id = "issueID"
                    placeholder = "enter member ID"
                    onChange={(event) => {
                        setIssueMemID(event.target.value);
                    }}
                />
            <br></br>
            <button onClick={showIssues}>Show Issued Books</button>
            <br></br>
            <br></br>
            <BasicTable columns={issued_columns} data= {showAllIssues}/>
            <br></br>
            <br></br>
            <h1>Return Book</h1>
            <label>Enter book ID: </label>
            <input
                type = "text"
                name = "Dues"
                id = "retID"
                placeholder = "ID of book to be returned"
                onChange={(event) => {
                    setRetID(event.target.value);
                }}
            />
            <br></br>
            <br></br>
            <button onClick={returnBook}>Return Book</button>
            <br></br>
            <br></br>
            <h1>Find Dues</h1>
            <label>Enter member ID: </label>
            <input
                    type = "text"
                    name = "memID"
                    id = "memID"
                    placeholder = "member ID"
                    onChange={(event) => {
                        setDueMemID(event.target.value);
                    }}
                />
                <br></br>
            <label>Your dues: </label>
            <input
                    type = "text"
                    name = "Dues"
                    id = "dues"
                    readOnly
                    onChange={(event) => {
                        setDues(event.target.value);
                    }}
                />
                <br></br>
                <br></br>
                <button onClick={calcDues}>Calculate Dues</button>
                <br></br>    
        </div>
    );
}

export default Issue;