create table member (
	member_id serial primary key,
	email varchar unique not null,
	password varchar not null
);

create table bike (
	bike_id serial primary key,
	name varchar not null,
	image text not null,
	nb_km numeric not null,
	date_of_purchase date not null,
	fk_member integer not null references member(member_id) on delete cascade
);

create table components_type (
	name varchar primary key
);

create table components (
	component_id serial primary key,
	bike_id integer not null references bike(bike_id) on delete cascade,
	nb_km numeric not null,
	date_of_purchase date,
	brand varchar,
	image varchar,
	duration numeric not null,
	component_type varchar not null references components_type(name) on delete cascade
);

insert into components_type values 
	('Cadre'),
	('Fourche'),
	('Roue avant'),
	('Roue arrière'),
	('Guidon'),
	('Chaine'),
	('Batterie'),
	('Pneu avant'),
	('Pneu arrière');