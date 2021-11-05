create table member (
	member_id serial primary key,
	email varchar unique not null,
	password varchar not null
);

create table bike (
	bike_id serial primary key,
	name varchar not null,
	image text not null,
	nb_km integer not null,
	date_of_purchase date not null,
	fk_member integer not null references member(member_id) on delete cascade
);

create table frame (
	frame_id serial primary key,
	frame_brand text,
	frame_km integer,
	frame_duration integer,
	fk_bike integer not null references bike(bike_id) on delete cascade
);

create table fork (
	fork_id serial primary key,
	fork_brand text,
	fork_km integer,
	fork_duration integer,
	fk_bike integer not null references bike(bike_id) on delete cascade
);

create table string (
	string_id serial primary key,
	string_brand text,
	string_km integer,
	string_duration integer,
	fk_bike integer not null references bike(bike_id) on delete cascade
);

create table brake_forward (
	brake_forward_id serial primary key,
	brake_forward_brand text,
	brake_forward_km integer,
	brake_forward_duration integer,
	fk_bike integer not null references bike(bike_id) on delete cascade
);

create table brake_backward (
	brake_backward_id serial primary key,
	brake_backward_brand text,
	brake_backward_km integer,
	brake_backward_duration integer,
	fk_bike integer not null references bike(bike_id) on delete cascade
);

create table wheel_forward (
	wheel_forward_id serial primary key,
	wheel_forward_brand text,
	wheel_forward_km integer,
	wheel_forward_duration integer,
	fk_bike integer not null references bike(bike_id) on delete cascade
);

create table wheel_backward (
	wheel_backward_id serial primary key,
	wheel_backward_brand text,
	wheel_backward_km integer,
	wheel_backward_duration integer,
	fk_bike integer not null references bike(bike_id) on delete cascade
);

create table tire_forward (
	tire_forward_id serial primary key,
	tire_forward_brand text,
	tire_forward_km integer,
	tire_forward_duration integer,
	fk_bike integer not null references bike(bike_id) on delete cascade
);

create table tire_backward (
	tire_backward_id serial primary key,
	tire_backward_brand text,
	tire_backward_km integer,
	tire_backward_duration integer,
	fk_bike integer not null references bike(bike_id) on delete cascade
);

create table air_chamber_forward (
	air_chamber_forward_id serial primary key,
	air_chamber_forward_brand text,
	air_chamber_forward_km integer,
	air_chamber_forward_duration integer,
	fk_bike integer not null references bike(bike_id) on delete cascade
);

create table air_chamber_backward (
	air_chamber_backward_id serial primary key,
	air_chamber_backward_brand text,
	air_chamber_backward_km integer,
	air_chamber_backward_duration integer,
	fk_bike integer not null references bike(bike_id) on delete cascade
);

create table transmission (
	transmission_id serial primary key,
	transmission_brand text,
	transmission_km integer,
	transmission_duration integer,
	fk_bike integer not null references bike(bike_id) on delete cascade
);

-- voir avec patins et disques de freins
-- pédales
-- plateau

create or replace procedure init_average_life_duration(member_id integer)
as $$
declare
	id integer;
	km integer;
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
	frame_brand text,
	frame_duration integer,
	frame_km integer,

	fork_id integer,
	fork_brand text,
	fork_duration integer,
	fork_km integer,

	string_id integer,
	string_brand text,
	string_duration integer,
	string_km integer,

	brake_forward_id integer,
	brake_forward_brand text,
	brake_forward_duration integer,
	brake_forward_km integer,

	brake_backward_id integer,
	brake_backward_brand text,
	brake_backward_duration integer,
	brake_backward_km integer,

	wheel_forward_id integer,
	wheel_forward_brand text,
	wheel_forward_duration integer,
	wheel_forward_km integer,

	wheel_backward_id integer,
	wheel_backward_brand text,
	wheel_backward_duration integer,
	wheel_backward_km integer,

	tire_forward_id integer,
	tire_forward_brand text,
	tire_forward_duration integer,
	tire_forward_km integer,

	tire_backward_id integer,
	tire_backward_brand text,
	tire_backward_duration integer,
	tire_backward_km integer,

	air_chamber_forward_id integer,
	air_chamber_forward_brand text,
	air_chamber_forward_duration integer,
	air_chamber_forward_km integer,

	air_chamber_backward_id integer,
	air_chamber_backward_brand text,
	air_chamber_backward_duration integer,
	air_chamber_backward_km integer,

	transmission_id integer,
	transmission_brand text,
	transmission_duration integer,
	transmission_km integer
	) as $$
begin
	return query select distinct
	fr.frame_id,
	fr.frame_brand,
	fr.frame_duration, 
	fr.frame_km,

	fo.fork_id,
	fo.fork_brand,
	fo.fork_duration,
	fo.fork_km,

	s.string_id,
	s.string_brand,
	s.string_duration,
	s.string_km,

	bf.brake_forward_id,
	bf.brake_forward_brand,
	bf.brake_forward_duration,
	bf.brake_forward_km,

	bb.brake_backward_id,
	bb.brake_backward_brand,
	bb.brake_backward_duration,
	bb.brake_backward_km,

	wf.wheel_forward_id,
	wf.wheel_forward_brand,
	wf.wheel_forward_duration,
	wf.wheel_forward_km,

	wb.wheel_backward_id,
	wb.wheel_backward_brand,
	wb.wheel_backward_duration,
	wb.wheel_backward_km,

	tf.tire_forward_id,
	tf.tire_forward_brand,
	tf.tire_forward_duration,
	tf.tire_forward_km,

	tb.tire_backward_id,
	tb.tire_backward_brand,
	tb.tire_backward_duration,
	tb.tire_backward_km,

	acf.air_chamber_forward_id,
	acf.air_chamber_forward_brand,
	acf.air_chamber_forward_duration,
	acf.air_chamber_forward_km,

	acb.air_chamber_backward_id,
	acb.air_chamber_backward_brand,
	acb.air_chamber_backward_duration,
	acb.air_chamber_backward_km,

	tr.transmission_id,
	tr.transmission_brand,
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
	where fr.fk_bike = bike_id;
end;
$$ language plpgsql;

create or replace procedure add_km_to_components(b_id integer, km integer)
as $$
declare 
	bike_km integer;
begin
	select nb_km into bike_km from bike where bike.bike_id = bike_id;
	
	update frame set frame_km = frame_km + (km - bike_km) where fk_bike = b_id;
	update fork set fork_km = fork_km + (km - bike_km) where fk_bike = b_id;
	update string set string_km = string_km + (km - bike_km) where fk_bike = b_id;
	update brake_backward set brake_backward_km = brake_backward_km + (km - bike_km) where fk_bike = b_id;
	update brake_forward set brake_forward_km = brake_forward_km + (km - bike_km) where fk_bike = b_id;
	update wheel_forward set wheel_forward_km = wheel_forward_km + (km - bike_km) where fk_bike = b_id;
	update wheel_backward set wheel_backward_km = wheel_backward_km + (km - bike_km) where fk_bike = b_id;
	update tire_forward set tire_forward_km = tire_forward_km + (km - bike_km) where fk_bike = b_id;
	update tire_backward set tire_backward_km = tire_backward_km + (km - bike_km) where fk_bike = b_id;
	update air_chamber_forward set air_chamber_forward_km = air_chamber_forward_km + (km - bike_km) where fk_bike = b_id;
	update air_chamber_backward set air_chamber_backward_km = air_chamber_backward_km + (km - bike_km) where fk_bike = b_id;
	update transmission set transmission_km = transmission_km + (km - bike_km) where fk_bike = b_id;
	commit;
end;
$$ language plpgsql;