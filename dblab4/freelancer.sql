--- 10:
create table "Project phases".phase_catalog_extra (
	id uuid default uuid_generate_v4(),
	phase_catalog_name varchar(255),
	project_outcome_id uuid,
	constraint phase_c_pk primary key (id),
	constraint phase_c_fk foreign key (project_outcome_id) references "Customers & Projects".project_outcome(id)
)


--- 12:
insert into "Freelancers"."Freelancers".availability (availability_name) values ('new_ava');


--- 13:
alter table "Project phases".phase_catalog_extra add column new_col boolean;
alter table "Project phases".phase_catalog_extra drop column new_col;


--- 14:
drop table "Project phases".phase_catalog_extra;

----------------------------------------------------------------------
--- 17a:
select sk.skill_name, skl."level"
from 
	"Freelancers"."Freelancers".freelancer fr
	inner join "Freelancers"."Freelancers".has_skill hs on
		fr.id = hs.freelancer_id
	inner join "Freelancers"."Freelancers".skill sk on
		sk.id = hs.skill_id
	inner join "Freelancers"."Freelancers".skill_level skl on 
		skl.id = hs.skill_level_id 
where
	fr.user_name = 'f1';


--- 17b:
select *
from 
	"Freelancers"."Customers & Projects".project proj
where proj.id not in (
		select p.id
		from "Freelancers"."Teams".on_project onp
		inner join "Freelancers"."Customers & Projects".project p on
			p.id = onp.project_id);


--- 17c:
select count(*)
from 
	"Freelancers"."Customers & Projects".project proj
where proj.id in (
		select p.id
		from "Freelancers"."Customers & Projects".project_outcome po
		inner join "Freelancers"."Customers & Projects".project p on
			p.project_outcome_id = po.id
		where po.is_completed_successfully = true);
		


--- 17d:
select distinct sk.skill_name
from
	"Freelancers"."Freelancers".skill sk,
	"Freelancers"."Freelancers".freelancer fr
	inner join "Freelancers"."Teams".team_member tm on
		fr.id = tm.freelancer_id
	inner join "Freelancers"."Freelancers".has_skill hs on
		fr.id = hs.freelancer_id 
where 
	tm.team_id = '519392f7-a49b-4cc5-ac30-497aa3a7b1a5' and
	hs.skill_id = sk.id 

	
	
--- 17e:
select count(*)
from
	"Freelancers"."Freelancers".freelancer fr
where 
	(select count(tm.id)
	 from
	 	"Freelancers"."Teams".team_member tm
	 where
		fr.id = tm.freelancer_id) >= 2;
		
	
	
--- 17f:
select fr.id, fr.user_name, count(distinct proj.id)
from
	"Freelancers"."Freelancers".freelancer fr
	inner join "Freelancers"."Teams".team_member tm on
		fr.id = tm.freelancer_id 
	inner join "Freelancers"."Teams".team t on
		tm.team_id = t.id
	inner join "Freelancers"."Teams".on_project op on 
		op.team_id = t.id
	inner join "Freelancers"."Customers & Projects".project proj on 
		proj.id = op.project_id
	inner join "Freelancers"."Customers & Projects".project_outcome po on
		po.id = proj.project_outcome_id
where po.is_completed_successfully = true 
group by fr.id
order by count(distinct proj.id)
limit 1


--- 17g:
create view score_card(frid, fruser, points) as (
	with failures (points) as (
		select count(distinct proj.id)
		from 
			"Freelancers"."Freelancers".freelancer fr
			inner join "Freelancers"."Teams".team_member tm on
				fr.id = tm.freelancer_id 
			inner join "Freelancers"."Teams".team t on
				tm.team_id = t.id
			inner join "Freelancers"."Teams".on_project op on 
				op.team_id = t.id
			inner join "Freelancers"."Customers & Projects".project proj on 
				proj.id = op.project_id
			inner join "Freelancers"."Customers & Projects".project_outcome po on
				po.id = proj.project_outcome_id
			where po.is_completed_successfully = false
	), wins (points) as (
		select count(distinct proj.id)
		from 
			"Freelancers"."Freelancers".freelancer fr
			inner join "Freelancers"."Teams".team_member tm on
				fr.id = tm.freelancer_id 
			inner join "Freelancers"."Teams".team t on
				tm.team_id = t.id
			inner join "Freelancers"."Teams".on_project op on 
				op.team_id = t.id
			inner join "Freelancers"."Customers & Projects".project proj on 
				proj.id = op.project_id
			inner join "Freelancers"."Customers & Projects".project_outcome po on
				po.id = proj.project_outcome_id
			where po.is_completed_successfully = true
	)
	select freel.id, freel.user_name, (-3*fa.points + 2*w.points)
	from "Freelancers"."Freelancers".freelancer freel, failures fa, wins w
)
select * from score_card




--- 17hpart1:
select fr.user_name, fr.email, fr.mobile 
from 
	"Freelancers"."Freelancers".freelancer fr
	inner join "Freelancers"."Freelancers".has_skill hs on
		fr.id = hs.freelancer_id
	inner join "Freelancers"."Freelancers".skill sk on
		sk.id = hs.skill_id
	inner join "Freelancers"."Freelancers".skill_level skl on 
		skl.id = hs.skill_level_id
where 
	sk.skill_name = 'java';



--- 17hpart2:
select proj.project_name, count(fr.id)
from
	"Freelancers"."Customers & Projects".project proj
	left outer join "Freelancers"."Teams".on_project onp on 
		proj.id = onp.project_id
	left outer join "Freelancers"."Teams".team_member tm  on 
		tm.team_id = onp.team_id
	left outer join "Freelancers"."Freelancers".freelancer fr on 
		tm.freelancer_id = fr.id
group by
	proj.id;
	
