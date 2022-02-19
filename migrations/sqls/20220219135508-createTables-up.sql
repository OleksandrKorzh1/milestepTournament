create table users(
	id int primary key generated always as identity ,
	username varchar(100) not null unique,
	email varchar(100) not null unique,
	password varchar not null,
	refreshToken varchar
);
create table groups(
	id int primary key generated always as identity ,
	name varchar(100) not null,
	topic varchar(100) not null
);
create table usersGroups(
	user_id integer references users(id),
	group_id integer references groups(id)
);
create table events(
	id int primary key generated always as identity ,
	name varchar,
	group_id  integer REFERENCES groups(id)
)
