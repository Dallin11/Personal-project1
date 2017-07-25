insert into events (userId integer references users(userId),title, color, start_time, end_time) values ($1, $2, $3, $4, $5)
returning *