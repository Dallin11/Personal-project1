create table events(
 title text,
  color text, 
  description text,
   notes text,
    start_date date,
     end_date date
)

create table grades(
    name text,
    grade int
) 

insert into grades(name, grade) values ("Dallin Andeson", 3), ("Jimmy smith", 2), ("Samantha Grow", 1), ("John Jacobs", 4)