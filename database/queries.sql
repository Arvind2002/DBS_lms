
----b)Genre
select * from books where genre like "%genre%";
----c)Author
select * from books where author like "%author%";

--8)Issue books(check if already issued)
    start transaction;
    select * from issued where bookID = input_ID; -- checks if the book is already issued
    select count(*)-numBooks from acType,issued,members where actype.typeId = members.typeID and members.memID = issued.memID and members.memID = input_id;
    --if result>0 book not issued insert into table  
    insert into issued values(mem_id,book_id,curdate());
    commit; 

--9) display names of the members who issued books along with the books the issued
select numbooks-count(*) from acType,issued,members where actype.typeId = members.typeID and members.memID = issued.memID and members.memID = 1;