insert into events (userId, title, color, start_time, end_time) values ($1, $2, $3, $4)
returning *