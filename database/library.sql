create database library;
use library;

create table books(
    bookID int PRIMARY KEY AUTO_INCREMENT,
    title varchar(50),
    author varchar(50),
    publisher varchar(50),
    genre varchar(20)
);

create table locations(
    hall int,
    shelf int,
    genre varchar(20) REFERENCES books(genre) NOT NULL,
    PRIMARY KEY(hall, shelf)
);

create table acType(
    typeID int PRIMARY KEY AUTO_INCREMENT,
    typeName varchar(10),
    cost int,
    numBooks int,
    duration int,
    penatlyPerWeek int
);

create table members(
    memID int PRIMARY KEY AUTO_INCREMENT,
    memName varchar(50),
    typeID int REFERENCES acType(typeID)
);

create table rooms(
    roomID int PRIMARY KEY AUTO_INCREMENT,
    roomName varchar(20),
    costPerHour int
);

create table issued(
    bookID int REFERENCES books(bookID),
    memID int REFERENCES members(memID),
    dateOfIssue DATE,
    PRIMARY KEY(bookID, memID)
);

create table timings(
    hour int,
    startTime TIME,
    endTime TIME
);

create table reservations(
    roomID int REFERENCES rooms(roomID),
    memID int REFERENCES members(memID),
    hour int REFERENCES timings(hour),
    PRIMARY KEY(roomID, hour)
);

insert into books values(1, 'hary poter', 'jkr', 'penguin');

insert into acType values(1, 'Platinum', 2000, 5, 4, 50);
insert into acType values(2, 'Gold', 1800, 4, 3, 50);
insert into acType values(3, 'Silver', 1500, 2, 2, 40);
insert into acType values(4, 'Bronze', 1200, 1, 1, 30);

insert into timings values(1, 8:00, 8:50);
insert into timings values(2, 9:00, 9:50);
insert into timings values(3, 10:00, 10:50);
insert into timings values(4, 11:00, 11:50);
insert into timings values(5, 14:00, 14:50);
insert into timings values(6, 15:00, 15:50);
insert into timings values(7, 16:00, 16:50);
insert into timings values(8, 17:00, 17:50);