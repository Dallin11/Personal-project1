insert into events (subject, description, notes, time, color) values ($1, $2, $3, $4, $5)
returning *