import '../App.css';
import Axios from 'axios'
import React, { useEffect, useState } from "react"
import BasicTable from '../components/BasicTable.js'
import {acc_columns} from '../components/acc-columns.js'
import {book_columns} from '../components/book-columns.js'
import {room_columns} from '../components/room-columns.js'


const Rooms = () => {
    const [showRoomsName, setShowRoomsName] = useState([]);
    const [bookRoomID, setBookRoomID] = useState(0);
    const [bookMemID, setBookMemID] = useState(0);
    const [bookHour, setHour] = useState(0);


    const [bookRoomsList, setBookRoomList] = useState([]);



    const showRooms = () =>{
        Axios.get("http://localhost:3001/show_rooms")
        .then((response) => {
            setShowRoomsName(response.data);
            console.log(response);
        });
    }

    const bookRoom = () =>{
        if((bookHour<1) || (bookHour >8)){
            alert("Enter a valid hour");
        }
        Axios.post("http://localhost:3001/book_room",{
            roomID:bookRoomID,
            memID:bookMemID,
            hour:bookHour,
        }).then((response) => {
            alert(response);
        });
    };

    const showAllRooms = React.useMemo(()=>showRoomsName);
    return(
        <div>
            <h1>Room Booking</h1>
            <br></br>
                <button onClick={showRooms}>Display Rooms</button>
                <br></br>
                <br></br>
                <BasicTable columns={room_columns} data= {showAllRooms}/>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <label>Enter ID of the room you want to book:</label>
                <input
                    type = "text"
                    name = "roomID"
                    placeholder = "Enter room ID"
                    onChange={(event) => {
                        setBookRoomID(event.target.value);
                    }}
                />
                <br></br>
                <label>Enter ID of the member who wants to book:</label>
                <input
                    type = "text"
                    name = "memID"
                    placeholder = "Enter member ID"
                    onChange={(event) => {
                        setBookMemID(event.target.value);
                    }}
                />
                <br></br>
                <label>Enter hour you want to book:</label>
                <input
                    type = "text"
                    name = "hour"
                    placeholder = "Enter an hour from 1-8"
                    onChange={(event) => {
                        setHour(event.target.value);
                    }}
                />


                <br></br>
                <button onClick={bookRoom}>Book Room</button>
                <br></br>
                <br></br>
        </div>

    );
};

export default Rooms;