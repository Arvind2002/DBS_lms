import '../App.css';
import Axios from 'axios'
import React, { useEffect, useState } from "react"
import BasicTable from '../components/BasicTable.js'
import {acc_columns} from '../components/acc-columns.js'
import {book_columns} from '../components/book-columns.js'

const Accounts = () => {
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

    return(
        <div>
            <h1>Add Members</h1>
            <h3>Account Details</h3>

            <div className="Information">
                <label>Name:</label>
                <input
                type = "text"
                name = "memName"
                placeholder = "Enter your name"
                onChange={(event) => {
                    setMemName(event.target.value);
                }}
                />

                <br></br>
                <label>Account Type:</label>
                <input
                type = "text"
                name = "type"
                placeholder = "Platinum/Gold/Silver/Bronze"
                onChange={(event) => {
                    setType(event.target.value);
                }}
                />
            </div>

            <div className="Tables">  
                <br></br>
                <button onClick={addMember}>Add Member</button>
                <br></br>
                <br></br>
                <br></br>
                <label>Search Account:</label>
                <input
                    type = "text"
                    name = "memSearchName"
                    placeholder = "Enter name of member"
                    onChange={(event) => {
                        setMemSearchName(event.target.value);
                    }}
                />

                <br></br>
                <button onClick={searchMembers}>Search</button>
                <br></br>
                <br></br>
                <BasicTable columns={acc_columns} data= {searchAccData}/>
                <br></br>
                <br></br>
                <label>Delete Account:</label>
                <input
                    type = "text"
                    name = "type"
                    placeholder = "Enter ID of account"
                    onChange={(event) => {
                        setMemDeleteID(event.target.value);
                    }}
                />
                
                <br></br>
                <button onClick={deleteMember}>Delete Member</button>
            </div>
        </div>
    );
};

export default Accounts;