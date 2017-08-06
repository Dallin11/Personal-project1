<<<<<<< HEAD
insert into evuserId integer references users(userId),title, color, start_time, end_time) values ($1, $2, $3, $4, $5)
=======
insert into events (title, color, start_time, end_time) values ($1, $2, $3, $4)
>>>>>>> 78d6e13b67bff3e42c8c8b9c482038c7e642892e
returning *