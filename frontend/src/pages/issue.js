import '../App.css';
import Axios from 'axios'
import React, { useEffect, useState } from "react"
import BasicTable from '../components/BasicTable.js'
import {acc_columns} from '../components/acc-columns.js'
import {book_columns} from '../components/book-columns.js'
import {room_columns} from '../components/room-columns.js'
import {reserved_columns} from '../components/reserved-columns.js'
import {issued_columns} from '../components/issued-columns.js'

const Issue = () => {
    const [issueMemID, setIssueMemID] = useState(0);
    const [issueList, setIssueList] = useState([]);
    const [dueBookID, setDueBookID] = useState(0);
    const [dueMemID, setDueMemID] = useState(0);
    const [dues, setDues] = useState(0);

    const showIssues = () =>{
        Axios.get("http://localhost:3001/show_issues",{
            params:
            {memID: issueMemID}
        }).then((response) => {
            setIssueList(response.data);
        });
        document.getElementById("issueID").value = "";

    }

    const calcDues = () =>{
        Axios.get("http://localhost:3001/calc_dues",{
            params:
            {   bookID: dueBookID,   
                memID: dueMemID,
            }
        }).then((response) => {
            setDues(response.data);
            if(dues>0){
                document.getElementById("dues").value = dues;
            }
            else{
                document.getElementById("dues").value = "0";

            }
        });
        document.getElementById("memID").value = "";
        document.getElementById("bookID").value = "";
        

    }

    const showAllIssues = React.useMemo(()=>issueList);

    return(
        <div>
            <label>Show books issued by member: </label>
            <br></br>
            <input
                    type = "text"
                    name = "memID"
                    id = "issueID"
                    placeholder = "Enter member ID"
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
            <label>Find Dues</label>
            <br></br>
            <br></br>
            <label>Enter your memID: </label>
            <input
                    type = "text"
                    name = "memID"
                    id = "memID"
                    placeholder = "Enter member ID"
                    onChange={(event) => {
                        setDueMemID(event.target.value);
                    }}
                />
                <br></br>
            <label>Enter Book ID you have issued: </label>
            <input
                    type = "text"
                    name = "bookID"
                    id = "bookID"
                    placeholder = "Enter book ID"
                    onChange={(event) => {
                        setDueBookID(event.target.value);
                    }}
                />
                <br></br>
                <br></br>
            <label>Your dues: </label>
            <input
                    type = "text"
                    name = "Dues"
                    id = "dues"
                    placeholder = "Your dues"
                    readOnly
                    onChange={(event) => {
                        setDues(event.target.value);
                    }}
                />
                <br></br>
                <br></br>
                <button onClick={calcDues}>Calculate Dues</button>

        </div>
    );
}

export default Issue;