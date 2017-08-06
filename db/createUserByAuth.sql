insert into users (username, auth0id) values ($1, $2) returning username, auth0id;
