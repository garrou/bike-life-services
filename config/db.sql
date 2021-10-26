create table member (
	member_id serial primary key,
	email varchar unique not null,
	password varchar not null
);

create table bike (
	bike_id serial primary key,
	name varchar not null,
	description varchar not null,
	image text not null,
	nb_km numeric,
	date_of_purchase date not null,
	fk_member integer not null references member(member_id) on delete cascade
);

create table frame (
	frame_id serial primary key,
	brand text,
	nb_km numeric,
	average_life_duration numeric,
	fk_bike integer not null references bike(bike_id) on delete cascade
);

create table fork (
	fork_id serial primary key,
	brand text,
	nb_km numeric,
	average_life_duration numeric,
	fk_bike integer not null references bike(bike_id) on delete cascade
);

create table string (
	string_id serial primary key,
	brand text,
	nb_km numeric,
	average_life_duration numeric,
	fk_bike integer not null references bike(bike_id) on delete cascade
);

create table brake_forward (
	brake_forward_id serial primary key,
	brand text,
	nb_km numeric,
	average_life_duration numeric,
	fk_bike integer not null references bike(bike_id) on delete cascade
);

create table brake_backward (
	brake_backward_id serial primary key,
	brand text,
	nb_km numeric,
	average_life_duration numeric,
	fk_bike integer not null references bike(bike_id) on delete cascade
);

create table wheel_forward (
	wheel_forward_id serial primary key,
	brand text,
	nb_km numeric,
	average_life_duration numeric,
	fk_bike integer not null references bike(bike_id) on delete cascade
);

create table wheel_backward (
	wheel_backward_id serial primary key,
	brand text,
	nb_km numeric,
	average_life_duration numeric,
	fk_bike integer not null references bike(bike_id) on delete cascade
);

create table tire_forward (
	tire_forward_id serial primary key,
	brand text,
	nb_km numeric,
	average_life_duration numeric,
	fk_bike integer not null references bike(bike_id) on delete cascade
);

create table tire_backward (
	tire_backward_id serial primary key,
	brand text,
	nb_km numeric,
	average_life_duration numeric,
	fk_bike integer not null references bike(bike_id) on delete cascade
);

create table air_chamber_forward (
	air_chamber_forward_id serial primary key,
	brand text,
	nb_km numeric,
	average_life_duration numeric,
	fk_bike integer not null references bike(bike_id) on delete cascade
);

create table air_chamber_backward (
	air_chamber_backward_id serial primary key,
	brand text,
	nb_km numeric,
	average_life_duration numeric,
	fk_bike integer not null references bike(bike_id) on delete cascade
);

create table transmission (
	transmission_id serial primary key,
	brand text,
	nb_km numeric,
	average_life_duration numeric,
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

	insert into frame (average_life_duration, nb_km, fk_bike) values (20000, km, id);
	insert into fork (average_life_duration, nb_km, fk_bike) values (20000, km, id);
	insert into string (average_life_duration, nb_km, fk_bike) values (7000, km, id);
	insert into brake_backward (average_life_duration, nb_km, fk_bike) values (4000, km, id);
	insert into brake_forward (average_life_duration, nb_km, fk_bike) values (4000, km, id);
	insert into wheel_forward (average_life_duration, nb_km, fk_bike) values (25000, km, id);
	insert into wheel_backward (average_life_duration, nb_km, fk_bike) values (25000, km, id);
	insert into tire_forward (average_life_duration, nb_km, fk_bike) values (7500, km, id);
	insert into tire_backward (average_life_duration, nb_km, fk_bike) values (7500, km, id);
	insert into air_chamber_forward (average_life_duration, nb_km, fk_bike) values (7500, km, id);
	insert into air_chamber_backward (average_life_duration, nb_km, fk_bike) values (7500, km, id);
	insert into transmission (average_life_duration, nb_km, fk_bike) values (20000, km, id);
	commit;
end;
$$ language plpgsql;

create or replace function get_all_bike_components(bike_id integer) 
returns 
table(
	frame_duration numeric,
	frame_km numeric,
	fork_duration numeric,
	fork_km numeric,
	string_duration numeric,
	string_km numeric,
	brake_forward_duration numeric,
	brake_forward_km numeric,
	brake_backward_duration numeric,
	brake_backward_km numeric,
	wheel_forward_duration numeric,
	wheel_forward_km numeric,
	wheel_backward_duration numeric,
	wheel_backward_km numeric,
	tire_forward_duration numeric,
	tire_forward_km numeric,
	tire_backward_duration numeric,
	tire_backward_km numeric,
	air_chamber_forward_duration numeric,
	air_chamber_forward_km numeric,
	air_chamber_backward_duration numeric,
	air_chamber_backward_km numeric,
	transmission_duration numeric,
	transmission_km numeric
	) as $$
begin
	return query select distinct
	fr.average_life_duration, 
	fr.nb_km,
	fo.average_life_duration,
	fo.nb_km,
	s.average_life_duration,
	s.nb_km,
	bf.average_life_duration,
	bf.nb_km,
	bb.average_life_duration,
	bb.nb_km,
	wf.average_life_duration,
	wf.nb_km,
	wb.average_life_duration,
	wb.nb_km,
	tf.average_life_duration,
	tf.nb_km,
	tb.average_life_duration,
	tb.nb_km,
	acf.average_life_duration,
	acf.nb_km,
	acb.average_life_duration,
	acb.nb_km,
	tr.average_life_duration,
	tr.nb_km
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

create or replace procedure add_km_to_components(b_id integer, km numeric)
as $$
declare 
	bike_km numeric;
begin
	select nb_km into bike_km from bike where bike.bike_id = bike_id;
	
	update frame set nb_km = nb_km + (km - bike_km) where fk_bike = b_id;
	update fork set nb_km = nb_km + (km - bike_km) where fk_bike = b_id;
	update string set nb_km = nb_km + (km - bike_km) where fk_bike = b_id;
	update brake_backward set nb_km = nb_km + (km - bike_km) where fk_bike = b_id;
	update brake_forward set nb_km = nb_km + (km - bike_km) where fk_bike = b_id;
	update wheel_forward set nb_km = nb_km + (km - bike_km) where fk_bike = b_id;
	update wheel_backward set nb_km = nb_km + (km - bike_km) where fk_bike = b_id;
	update tire_forward set nb_km = nb_km + (km - bike_km) where fk_bike = b_id;
	update tire_backward set nb_km = nb_km + (km - bike_km) where fk_bike = b_id;
	update air_chamber_forward set nb_km = nb_km + (km - bike_km) where fk_bike = b_id;
	update air_chamber_backward set nb_km = nb_km + (km - bike_km) where fk_bike = b_id;
	update transmission set nb_km = nb_km + (km - bike_km) where fk_bike = b_id;
	commit;
end;
$$ language plpgsql;