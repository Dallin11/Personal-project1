create table events(
userId integer references users(userId),
 title text,
  color text, 
     start_time timestamp,
     end_time timestamp
)

insert into events(title, color, description, notes, start_date, end_date) values ("Math", "red", "learn to count by fives", "Have kids work through problems on hw sheet", 6-27-2017, 6-27-2017)

create table grades(
    userId integer references users(userId),
    name text,
    grade integer
)

create table users(
    userId serial primary key,
    name text,
    username text,
    password varchar,
    auth0Id text


)

