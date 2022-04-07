create database library;
use library;

create table books(
    bookID int PRIMARY KEY AUTO_INCREMENT,
    title varchar(50),
    author varchar(50),
    publisher varchar(50)
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

insert into acType values(1,'Diamond',1000,100,30,10);
insert into acType values(2,'Gold',800,80,20,20);
insert into acType values(3,'Silver',600,60,10,30);