import '../App.css';
import Axios from 'axios'
import React, { useEffect, useState } from "react"
import BasicTable from '../components/BasicTable.js'
import {room_columns} from '../components/room-columns.js'
import {reserved_columns} from '../components/reserved-columns.js'


const Rooms = () => {
    const [showRoomsName, setShowRoomsName] = useState([]);
    const [showReservations, setShowReservations] = useState([]);
    const [bookRoomID, setBookRoomID] = useState(0);
    const [bookMemID, setBookMemID] = useState(0);
    const [bookHour, setHour] = useState(0);
    const [bookRoomsList, setBookRoomList] = useState([]);
    const [delRoomID, setDelRoomID] = useState(0);
    const [delMemID, setDelMemID] = useState(0); 
    const [delHour, setDelHour] = useState(0);


    const showRooms = () =>{
        Axios.get("http://localhost:3001/show_rooms")
        .then((response) => {
            setShowRoomsName(response.data);
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
            <body onLoad={showRooms()}>
                <BasicTable columns={room_columns} data= {showAllRooms}/>
                <br></br>
                <label>Enter ID of room to be booked: </label>
                <input
                    type = "text"
                    name = "roomID"
                    id = "room"
                    placeholder = "enter room ID"
                    onChange={(event) => {
                        setBookRoomID(event.target.value);
                    }}
                />
                <br></br>
                <label>Enter member ID: </label>
                <input
                    type = "text"
                    name = "memID"
                    id = "member"
                    placeholder = "enter member ID"
                    onChange={(event) => {
                        setBookMemID(event.target.value);
                    }}
                />
                <br></br>
                <label>Enter hour to be booked: </label>
                <input
                    type = "text"
                    name = "hour"
                    id = "hour"
                    placeholder = "enter an hour from 1 to 8"
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
                <BasicTable columns={reserved_columns} data= {showAllReserved}/>
                <br></br>
                <button onClick={displayReservations}>Show All reservations</button>
                <br></br>
                <br></br>
                <h3>List of Reservations</h3>
                <br></br>
                <label>Enter member ID: </label>
                <input
                    type = "text"
                    name = "memID"
                    id = "delMemBox"
                    placeholder = "enter member ID"
                    onChange={(event) => {
                        setDelMemID(event.target.value);
                    }}
                />
                <br></br>
                <label>Enter room ID to be cancelled: </label>
                <input
                    type = "text"
                    name = "roomID"
                    id = "delRoomBox"
                    placeholder = "enter room ID"
                    onChange={(event) => {
                        setDelRoomID(event.target.value);
                    }}
                />
                <br></br>
                <label>Enter the hour to be cancelled: </label>
                <input
                    type = "text"
                    name = "memID"
                    id = "delHourBox"
                    placeholder = "enter hour"
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
            </body>
        </div>

    );
};

export default Rooms;