drop database bikelife if exists;

create database bikelife;

use bikelife;

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

create table frame (
	frame_id serial primary key,
	frame_brand text,
	frame_km numeric,
	frame_duration numeric,
	fk_bike integer not null references bike(bike_id) on delete cascade
);

create table fork (
	fork_id serial primary key,
	fork_brand text,
	fork_km numeric,
	fork_duration numeric,
	fk_bike integer not null references bike(bike_id) on delete cascade
);

create table string (
	string_id serial primary key,
	string_brand text,
	string_km numeric,
	string_duration numeric,
	fk_bike integer not null references bike(bike_id) on delete cascade
);

create table brake_forward (
	brake_forward_id serial primary key,
	brake_forward_brand text,
	brake_forward_km numeric,
	brake_forward_duration numeric,
	fk_bike integer not null references bike(bike_id) on delete cascade
);

create table brake_backward (
	brake_backward_id serial primary key,
	brake_backward_brand text,
	brake_backward_km numeric,
	brake_backward_duration numeric,
	fk_bike integer not null references bike(bike_id) on delete cascade
);

create table wheel_forward (
	wheel_forward_id serial primary key,
	wheel_forward_brand text,
	wheel_forward_km numeric,
	wheel_forward_duration numeric,
	fk_bike integer not null references bike(bike_id) on delete cascade
);

create table wheel_backward (
	wheel_backward_id serial primary key,
	wheel_backward_brand text,
	wheel_backward_km numeric,
	wheel_backward_duration numeric,
	fk_bike integer not null references bike(bike_id) on delete cascade
);

create table tire_forward (
	tire_forward_id serial primary key,
	tire_forward_brand text,
	tire_forward_km numeric,
	tire_forward_duration numeric,
	fk_bike integer not null references bike(bike_id) on delete cascade
);

create table tire_backward (
	tire_backward_id serial primary key,
	tire_backward_brand text,
	tire_backward_km numeric,
	tire_backward_duration numeric,
	fk_bike integer not null references bike(bike_id) on delete cascade
);

create table air_chamber_forward (
	air_chamber_forward_id serial primary key,
	air_chamber_forward_brand text,
	air_chamber_forward_km numeric,
	air_chamber_forward_duration numeric,
	fk_bike integer not null references bike(bike_id) on delete cascade
);

create table air_chamber_backward (
	air_chamber_backward_id serial primary key,
	air_chamber_backwardbrand text,
	air_chamber_backward_km numeric,
	air_chamber_backward_duration numeric,
	fk_bike integer not null references bike(bike_id) on delete cascade
);

create table transmission (
	transmission_id serial primary key,
	transmission_brand text,
	transmission_km numeric,
	transmission_duration numeric,
	fk_bike integer not null references bike(bike_id) on delete cascade
);

-- voir avec patins et disques de freins
-- pédales
-- plateau

create or replace procedure init_average_life_duration(member_id integer)
as $$
declare
	id integer;
	km numeric;
begin
	select max(bike_id) into id from bike where fk_member = member_id;
	select nb_km into km from bike where bike_id = id;

	insert into frame (frame_duration, frame_km, fk_bike) values (20000, km, id);
	insert into fork (fork_duration, fork_km, fk_bike) values (20000, km, id);
	insert into string (string_duration, string_km, fk_bike) values (7000, km, id);
	insert into brake_backward (brake_backward_duration, brake_backward_km, fk_bike) values (4000, km, id);
	insert into brake_forward (brake_forward_duration, brake_forward_km, fk_bike) values (4000, km, id);
	insert into wheel_forward (wheel_forward_duration, wheel_forward_km, fk_bike) values (25000, km, id);
	insert into wheel_backward (wheel_backward_duration, wheel_backward_km, fk_bike) values (25000, km, id);
	insert into tire_forward (tire_forward_duration, tire_forward_km, fk_bike) values (7500, km, id);
	insert into tire_backward (tire_backward_duration, tire_backward_km, fk_bike) values (7500, km, id);
	insert into air_chamber_forward (air_chamber_forward_duration, air_chamber_forward_km, fk_bike) values (7500, km, id);
	insert into air_chamber_backward (air_chamber_backward_duration, air_chamber_backward_km, fk_bike) values (7500, km, id);
	insert into transmission (transmission_duration, transmission_km, fk_bike) values (20000, km, id);
	commit;
end;
$$ language plpgsql;

create or replace function get_all_bike_components(bike_id integer) 
returns 
table(
	frame_id integer,
	frame_duration numeric,
	frame_km numeric,

	fork_id integer,
	fork_duration numeric,
	fork_km numeric,

	string_id integer,
	string_duration numeric,
	string_km numeric,

	brake_forward_id integer,
	brake_forward_duration numeric,
	brake_forward_km numeric,

	brake_backward_id integer,
	brake_backward_duration numeric,
	brake_backward_km numeric,

	wheel_forward_id integer,
	wheel_forward_duration numeric,
	wheel_forward_km numeric,

	wheel_backward_id integer,
	wheel_backward_duration numeric,
	wheel_backward_km numeric,

	tire_forward_id integer,
	tire_forward_duration numeric,
	tire_forward_km numeric,

	tire_backward_id integer,
	tire_backward_duration numeric,
	tire_backward_km numeric,

	air_chamber_forward_id integer,
	air_chamber_forward_duration numeric,
	air_chamber_forward_km numeric,

	air_chamber_backward_id integer,
	air_chamber_backward_duration numeric,
	air_chamber_backward_km numeric,

	transmission_id integer,
	transmission_duration numeric,
	transmission_km numeric
	) as $$
begin
	return query select distinct
	fr.frame_id,
	fr.frame_duration, 
	fr.frame_km,

	fo.fork_id,
	fo.fork_duration,
	fo.fork_km,

	s.string_id,
	s.string_duration,
	s.string_km,

	bf.brake_forward_id,
	bf.brake_forward_duration,
	bf.brake_forward_km,

	bb.brake_backward_id,
	bb.brake_backward_duration,
	bb.brake_backward_km,

	wf.wheel_forward_id,
	wf.wheel_forward_duration,
	wf.wheel_forward_km,

	wb.wheel_backward_id,
	wb.wheel_backward_duration,
	wb.wheel_backward_km,

	tf.tire_forward_id,
	tf.tire_forward_duration,
	tf.tire_forward_km,

	tb.tire_backward_id,
	tb.tire_backward_duration,
	tb.tire_backward_km,

	acf.air_chamber_forward_id,
	acf.air_chamber_forward_duration,
	acf.air_chamber_forward_km,

	acb.air_chamber_backward_id,
	acb.air_chamber_backward_duration,
	acb.air_chamber_backward_km,

	tr.transmission_id,
	tr.transmission_duration,
	tr.transmission_km
	from frame as fr, 
	fork as fo, 
	string as s,
	brake_forward as bf, 
	brake_backward as bb, 
	wheel_forward as wf,
	wheel_backward as wb,
	tire_forward as tf,
	tire_backward as tb,
	air_chamber_forward as acf,
	air_chamber_backward as acb,
	transmission as tr
	where fr.fk_bike = bike_id
	and fo.fk_bike = bike_id
	and s.fk_bike = bike_id
	and bf.fk_bike = bike_id
	and bb.fk_bike = bike_id
	and wf.fk_bike = bike_id
	and wb.fk_bike = bike_id
	and tf.fk_bike = bike_id
	and tb.fk_bike = bike_id
	and acf.fk_bike = bike_id
	and acb.fk_bike = bike_id
	and tr.fk_bike = bike_id;
end;
$$ language plpgsql;

create or replace procedure add_km_to_components(b_id integer, km numeric)
as $$
begin
	update frame set frame_km = frame_km + km where fk_bike = b_id;
	update fork set fork_km = fork_km + km where fk_bike = b_id;
	update string set string_km = string_km + km where fk_bike = b_id;
	update brake_backward set brake_backward_km = brake_backward_km + km where fk_bike = b_id;
	update brake_forward set brake_forward_km = brake_forward_km + km where fk_bike = b_id;
	update wheel_forward set wheel_forward_km = wheel_forward_km + km where fk_bike = b_id;
	update wheel_backward set wheel_backward_km = wheel_backward_km + km where fk_bike = b_id;
	update tire_forward set tire_forward_km = tire_forward_km + km where fk_bike = b_id;
	update tire_backward set tire_backward_km = tire_backward_km + km where fk_bike = b_id;
	update air_chamber_forward set air_chamber_forward_km = air_chamber_forward_km + km where fk_bike = b_id;
	update air_chamber_backward set air_chamber_backward_km = air_chamber_backward_km + km where fk_bike = b_id;
	update transmission set transmission_km = transmission_km + km where fk_bike = b_id;
	commit;
end;
$$ language plpgsql;