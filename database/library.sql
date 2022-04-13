drop database library;
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
    hall int default 5,
    shelf int default 1,
    genre varchar(20) NOT NULL REFERENCES books(genre),
    PRIMARY KEY(hall, shelf)
);

create table acType(
    typeID int PRIMARY KEY AUTO_INCREMENT,
    typeName varchar(10),
    cost int,
    numBooks int,
    duration int,
    penaltyPerWeek int
);

create table members(
    memID int PRIMARY KEY AUTO_INCREMENT,
    memName varchar(50),
    typeID int check(typeID>0 and typeID<5) REFERENCES acType(typeID)
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
    PRIMARY KEY(bookID)
);

create table timings(
    hour int PRIMARY KEY,
    startTime TIME,
    endTime TIME
);

create table reservations(
    roomID int REFERENCES rooms(roomID),
    memID int REFERENCES members(memID),
    hour int REFERENCES timings(hour),
    PRIMARY KEY(roomID, hour)
);

start transaction;
insert into books values(1, 'hary poter', 'jkr', 'penguin','drama');

insert into acType values(1, 'Platinum', 2000, 5, 4, 50);
insert into acType values(2, 'Gold', 1800, 4, 3, 50);
insert into acType values(3, 'Silver', 1500, 2, 2, 40);
insert into acType values(4, 'Bronze', 1200, 1, 1, 30);

insert into timings values(1, '8:00:00', '8:50:00');
insert into timings values(2, '9:00:00', '9:50:00');
insert into timings values(3, '10:00:00', '10:50:00');
insert into timings values(4, '11:00:00', '11:50:00');
insert into timings values(5, '14:00:00', '14:50:00');
insert into timings values(6, '15:00:00', '15:50:00');
insert into timings values(7, '16:00:00', '16:50:00');
insert into timings values(8, '17:00:00', '17:50:00');

insert into rooms values(1,'Brainstorm', 100);
insert into rooms values(2,'Group Discussion', 120);
insert into rooms values(3,'Presentation', 150);
insert into rooms values(4,'Innovation Zone', 110);
insert into rooms values(5,'Ideation Zone', 110);
insert into rooms values(6,'Tinker Lab', 200);
insert into rooms values(7,'Computer Lab', 180);
insert into rooms values(8,'Art Studio', 160);

insert into locations values(1, 1, 'Journal');
insert into locations values(1, 2, 'Newspapers');
insert into locations values(1, 3, 'Physics');
insert into locations values(1, 4, 'Astronomy');
insert into locations values(2, 1, 'Chemistry');
insert into locations values(2, 2, 'Biology');
insert into locations values(2, 3, 'History');
insert into locations values(2, 4, 'Economics');
insert into locations values(3, 1, 'Mystery');
insert into locations values(3, 2, 'Romance');
insert into locations values(3, 3, 'Action');
insert into locations values(3, 4, 'Drama');
insert into locations values(4, 1, 'Comedy');
insert into locations values(4, 2, 'Children');
insert into locations values(4, 3, 'Self Help');
insert into locations values(4, 4, 'Philosophy');
commit;