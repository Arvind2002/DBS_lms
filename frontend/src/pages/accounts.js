import '../App.css';
import Axios from 'axios'
import React, { useEffect, useState } from "react"
import BasicTable from '../components/BasicTable.js'
import {acc_columns} from '../components/acc-columns.js'
//import 'bootstrap/dist/css/bootstrap.css';

const Accounts = () => {
    const [memName, setMemName] = useState("");
    const [type, setType] = useState("");

    const [memSearchName, setMemSearchName] = useState("");
    const [memSearchNameList, setMemSearchList] = useState([]);

    const [deleteID,setMemDeleteID] = useState(0);
    
    const [updateID, setUpdateID] = useState("");
    const [updateType, setUpdateType] = useState(0);
    const [updateName, setUpdateName] = useState("");

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

    const updateMember = () => {
        if((updateType<1) || (updateType >4)){
            alert("Wrong account type!");
        }
        Axios.post("http://localhost:3001/update_acc", {
            updateID: updateID,
            updateName: updateName,
            updateType: updateType,
        }).then(() => {
            alert("Account deleted!");
            console.log("successfully deleted");
        });
    };
    
    const searchAccData = React.useMemo(()=>memSearchNameList);

    return(
        <div>
            <h1>Member Details</h1>
            <h3>Add Member</h3>

            <div className="Add">
                <br></br>
                <label>Name: </label>
                <input
                type = "text"
                name = "memName"
                placeholder = "enter your name"
                onChange={(event) => {
                    setMemName(event.target.value);
                }}
                />

                <br></br>
                <label>Account Type: </label>
                <input
                type = "text"
                name = "type"
                placeholder = "platinum/gold/silver/bronze"
                onChange={(event) => {
                    setType(event.target.value);
                }}
                />

                <br></br>
                <button onClick={addMember}>Add Member</button>
            </div>

            <div className="Search">
                <br></br>
                <h3>Search Members</h3>
                <label>Search Account: </label>
                <input
                    type = "text"
                    name = "memSearchName"
                    placeholder = "enter member name"
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
            </div>

            <div className='Delete'>
                <br></br>
                <h3>Delete Account</h3>
                <label>Member ID: </label>
                <input
                    type = "text"
                    name = "type"
                    placeholder = "enter member ID"
                    onChange={(event) => {
                        setMemDeleteID(event.target.value);
                    }}
                />
                <br></br>
                <button onClick={deleteMember}>Delete Member</button>
                <br></br>
            </div>  

            <div className='Update'>
                <br></br>
                <h3>Update account</h3>
                <label>Member ID: </label>
                <input
                type = "text"
                name = "memName"
                placeholder = "enter your ID"
                onChange={(event) => {
                    setUpdateID(event.target.value);
                }}
                />
                <br></br>
                <label>New Name: </label>
                <input
                type = "text"
                name = "memName"
                placeholder = "enter your name"
                onChange={(event) => {
                    setUpdateName(event.target.value);
                }}
                />
                <br></br>
                <label>New Account Type ID: </label>
                <input
                type = "text"
                name = "type"
                placeholder = "1-platinum; 2-gold; 3-silver; 4-bronze"
                onChange={(event) => {
                    setUpdateType(event.target.value);
                }}
                />
                <br></br>
                <button onClick={updateMember}>Update Member</button>
            </div>
        </div>
    );
};

export default Accounts;