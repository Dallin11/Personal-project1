create table events(
 title text,
  color text, 
  description text,
   notes text,
    start_date date,
     end_date date
)

insert into events(title, color, description, notes, start_date, end_date) values ("Math", "red", "learn to count by fives", "Have kids work through problems on hw sheet", 6-27-2017, 6-27-2017)

create table grades(
    name text,
    grade integer
) 

insert into grades(name, grade) values ("Dallin Andeson", 3), ("Jimmy smith", 2), ("Samantha Grow", 1), ("John Jacobs", 4)