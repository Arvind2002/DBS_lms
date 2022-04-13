import '../App.css';
import Axios from 'axios'
import React, { useEffect, useState } from "react"
import BasicTable from '../components/BasicTable.js'
import {acc_columns} from '../components/acc-columns.js'
import {book_columns} from '../components/book-columns.js'
import {room_columns} from '../components/room-columns.js'
import {reserved_columns} from '../components/reserved-columns.js'


const Rooms = () => {
    const [showRoomsName, setShowRoomsName] = useState([]);
    const [showReservations, setShowReservations] = useState([]);

    const [bookRoomID, setBookRoomID] = useState(0);
    const [bookMemID, setBookMemID] = useState(0);
    const [bookHour, setHour] = useState(0);
    const [bookRoomsList, setBookRoomList] = useState([]);
<<<<<<< HEAD
=======
    const [delRoomID, setDelRoomID] = useState(0);
    const [delMemID, setDelMemID] = useState(0); 
    const [delHour, setDelHour] = useState(0);

>>>>>>> 13a13b0423c3d4dbede815e18be655257f627229

    const showRooms = () =>{
        Axios.get("http://localhost:3001/show_rooms")
        .then((response) => {
            setShowRoomsName(response.data);
            console.log(response);
        });
    }

    const displayReservations = () =>{
        Axios.get("http://localhost:3001/show_reservations")
        .then((response) => {
            setShowReservations(response.data);
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
            console.log(response);
        });
        document.getElementById("room").value = "";
        document.getElementById("member").value = "";
        document.getElementById("hour").value = "";


    };

    const deleteReservations = () =>{
        Axios.post("http://localhost:3001/delete_reservations",{
            roomID:delRoomID,
            memID:delMemID,
            hour:delHour,
        }).then((response) => {
            console.log("deleted");
        })
        document.getElementById("delRoomBox").value = "";
        document.getElementById("delMemBox").value = "";
        document.getElementById("delHourBox").value = "";


    };

    const showAllRooms = React.useMemo(()=>showRoomsName);
    const showAllReserved = React.useMemo(()=>showReservations);

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
                    id = "room"
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
                    id = "member"
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
                    id = "hour"
                    placeholder = "Enter an hour from 1-8"
                    onChange={(event) => {
                        setHour(event.target.value);
                    }}
                />

                <br></br>
                <button onClick={bookRoom}>Book Room</button>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <button onClick={displayReservations}>Show All reservations</button>
                <br></br>
                <br></br>
                <label>List of reservations</label>
                <br></br>
                <BasicTable columns={reserved_columns} data= {showAllReserved}/>
                <br></br>
                <br></br>
                <label>Enter your memberID: </label>
                <input
                    type = "text"
                    name = "memID"
                    id = "delMemBox"
                    placeholder = "Enter member ID"
                    onChange={(event) => {
                        setDelMemID(event.target.value);
                    }}
                />
                <br></br>
                <label>Enter the roomId you want to cancel: </label>
                <input
                    type = "text"
                    name = "roomID"
                    id = "delRoomBox"
                    placeholder = "Enter room ID"
                    onChange={(event) => {
                        setDelRoomID(event.target.value);
                    }}
                />
                <br></br>
                <label>Enter the hour you want to cancel: </label>
                <input
                    type = "text"
                    name = "memID"
                    id = "delHourBox"
                    placeholder = "Enter hour"
                    onChange={(event) => {
                        setDelHour(event.target.value);
                    }}
                />
                <br></br>
                <br></br>
                <button onClick={deleteReservations}>Delete reservation</button>
                <br></br>
                <br></br>
                <br></br>
        </div>

    );
};

export default Rooms;