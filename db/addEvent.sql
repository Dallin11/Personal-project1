insert into events (title, color, description, notes, start, end) values ($1, $2, $3, $4, $5)
returning *