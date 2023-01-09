



INSERT INTO users (username, password, first_name, last_name, phone)
VALUES ("Chalon", "testing", "Chalon", "Lubin", "911");

INSERT INTO users (username, password, first_name, last_name, phone)
VALUES ("Michael", "password", "Michael", "Pappas", "844");

INSERT INTO users (username, password, first_name, last_name, phone)
VALUES ("Islandboi", "sings", "Island", "Boy", "201");


INSERT INTO messages (
  from_username, to_username, body, sent_at)
VALUES ("Michael", "Chalon", "HEY!" , current_timestamp);

INSERT INTO messages (
  from_username, to_username, body, sent_at)
VALUES ("Chalon", "Michael", "MY CAT IS ANNOYING!" , current_timestamp);

INSERT INTO messages (
  from_username, to_username, body, sent_at)
VALUES ("Islandboi", "Michael", "MY VOICE IS ANNOYING!" , current_timestamp);





