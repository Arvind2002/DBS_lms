import { Link } from "react-router-dom";

export default function Navbar() {
  return(
    <header className="nav">
        <nav>
            <ul>
                <li><Link to = "/">Home</Link></li>
                <li><Link to = "/accounts">Accounts</Link></li>
                <li><Link to = "/books">Books</Link></li>
                <li><Link to = "/rooms">Room Booking</Link></li>
            </ul>
        </nav>
    </header>
  );
}