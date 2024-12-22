

# Library Management System

## Overview
The Library Management System is designed to streamline library operations, including member accounts, book inventory, and room reservations. It is built using a relational database model, ensuring smooth and efficient library management.

Made for our Database Systems course project.

## Features
- Member account creation, updates, and deletion.
- Book inventory management: add, search, issue, and delete books.
- Room reservations with time slot booking.
- Overdue calculations based on account types.
- Transactions for concurrency and consistency.

## Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js
- **Database**: MySQL

## Database Design Highlights
- **Normalization**: All tables normalized up to BCNF.
- Tables include `Members`, `Books`, `Rooms`, `Reservations`, and `Timings`.
  <img width="504" alt="Screenshot 2024-12-22 at 1 45 43 PM" src="https://github.com/user-attachments/assets/1907a3c4-d564-498d-bac3-78fb5f220cc2" />


## Execution Steps

1) Run library.sql script on mysql (Until The first commit, i.e., right before "queries used").
2) Navigate to frontend directory and execute the command 'npm i'. 
3) Run 'npm start' from frontend directory. Keep it running throughout. 
4) Navigate to backend directory and excecute the command 'npm i'. 
5) Run 'node index.js from backend directory. 
6) Open "localhost:3000" on your browser to access the website.

## Usage
- Use the web interface to manage members, books, and rooms.
- Automates overdue calculations and maintains consistent records.

## Authors
Arvind Ram (2020A7PS1210P)
Rishabh Kumar (2020A7PS1211P)


