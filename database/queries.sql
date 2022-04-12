--Queries needed
--1)Add members
INSERT INTO members (memName, typeID) select 'INPUT_NAME',typeID from acType where typeName = 'Bronze/Silver/Gold/Platinum';
--2)Find members
----a)ID
select ifNULL(*,"Name not found") from members where memID = INPUT_ID; -- need to raise flags
----b)name
select * from members where memName like "%INPUT_Name%"; -- need to raise flags

--3)Upgrade/Downgrade members
update memebers set typeID = new_typeID where memID = thisID; -- typeID BT  

--4)Delete memebers
delete members where memID = thisID

--5)Add books(check if book already exists) - give location based on genre
insert into books (title,author,publisher,genre) values ("...",'....','...','...'); -- need to check if genre, title present

--6)Search books on
----a)Name
select * from books where title like "%name%";
----b)Genre
select * from books where genre like "%genre%";
----c)Author
select * from books where author like "%author%";
----d)Find location of books
select hall,shelf from locations,books where books.genre = locations.genre and books.title like "%name%"; -- need to raise flags

--7)Delete books
delete from books where bookID = input_ID;

--8)Issue books(check if already issued)
    start transaction
    select * from issued where bookID = input_ID -- checks if the book is already issued
    select count(*)-numBooks from acType,issued,members where actype.typeId = members.typeID and members.memID = issued.memID and members.memID = input_id;
    --if result>0 book not issued insert into table  
    insert into issued values(mem_id,book_id,curdate());
    commit; 

--9) display names of the members who issued books along with the books the issued
select numbooks-count(*) from acType,issued,members where actype.typeId = members.typeID and members.memID = issued.memID and members.memID = 1;

--10)Return books
    start transaction
    delete from issued where issued.bookID = input_id;
    commit

--8)Calculate due
    select penaltyPerWeek*DATEDIFF(curdate()-)

--9)Book rooms(check for availability)

