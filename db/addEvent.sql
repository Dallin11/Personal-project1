insert into events (title, color, description, notes, start_time, end_time) values ($1, $2, $3, $4, $5, $6)
returning *