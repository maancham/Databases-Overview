--- 1
 select
	r.region_description,
	t.territory_description
from
	region r
inner join territories t on
	t.region_id = r.region_id
order by
	r.region_description ;
	

--- 1 second part

select
	r.region_description ,
	count(distinct et.employee_id) as "head_count"
from
	region r
inner join territories t on
	t.region_id = r.region_id
inner join employee_territories et on
	et.territory_id = t.territory_id
group by
	r.region_id ;

--------------------------------------------------

--- 2
select
	e.first_name, e.last_name
from
	territories t
inner join employee_territories et on
	et.territory_id = t.territory_id
inner join employees e on
	e.employee_id = et.employee_id
where
	t.territory_description = 'Orlando';


--------------------------------------------------

--- 3
select
	count(*) as "non-USA customers"
from
	customers c
where
	c.country != 'USA';

--------------------------------------------------

--- 4
create view emergency as
	select *
	from products p2
	where p2.reorder_level > p2.units_in_stock 
	order by p2.units_in_stock asc;

select * from emergency;

--------------------------------------------------


--- 5
select
	sum(od.unit_price*od.quantity*(1-od.discount))
from
	order_details od
where
	od.order_id = '10252';

--------------------------------------------------


--- 6
select
	p.product_id, p.product_name, sum(od.quantity)
from
	orders o
inner join order_details od on
	o.order_id = od.order_id
inner join products p on
	p.product_id = od.product_id
where
	o.order_date between '1996-08-01' and '1996-08-31'
group by
	p.product_id 
order by
	sum(od.quantity) desc
limit 1;

--------------------------------------------------


--- 7
select
	ord.ship_country, sum(od.quantity)
from
	orders ord
inner join order_details od on
	ord.order_id = od.order_id
where
	ord.ship_country != 'USA'
group by
	ord.ship_country ;

--------------------------------------------------


--- 8
select
	c.category_name , sum(ord.quantity)
from
	categories c
inner join products p on
	p.category_id = c.category_id
inner join order_details ord on
	ord.product_id = p.product_id
inner join orders o on
	o.order_id = ord.order_id
where
	o.ship_country = 'Germany'
group by
	c.category_id ;

--------------------------------------------------

--- 9

select * 
from customers c 
where c.fax isnull ;


--------------------------------------------------

--- 10
select e.employee_id, e.first_name, e.last_name, e.birth_date 
from 
	employees e 
inner join orders o on
	e.employee_id = o.employee_id 
where
	1997 = extract(year from o.order_date)
group by
	e.employee_id 
order by
	count(*) desc
limit 3

--------------------------------------------------


--- 11
select distinct s.*
from
	shippers s
inner join orders o on
	o.ship_via = s.shipper_id
where
	o.ship_country = 'Germany'
intersect

select distinct s.*
from
	shippers s
inner join orders o on
	o.ship_via = s.shipper_id
where
	o.ship_country = 'France';

	
--------------------------------------------------


--- 12
with france_present as (
select
	distinct c.category_id
from
	orders o
inner join order_details ord on
	ord.order_id = o.order_id
inner join products p on
	p.product_id = ord.product_id
inner join categories c on
	c.category_id = p.category_id
where
	o.ship_country = 'France' )
	
select
	c.category_name
from
	categories c
where
	c.category_id not in (
	select *
	from france_present) ;

	
--------------------------------------------------


--- 13
create view age_of_emp as
	select e.*, extract(year
		from
			age(now(), e.birth_date)) as "age"
		from
			employees e ;

select employee_id, age from age_of_emp ;


select
	r2.region_description, datee."total average"
from
	( with info as (
	select *
	from age_of_emp)
	select
		r.region_id , (avg(information.age)) as "total average"
	from
		employee_territories et
	inner join (
		select *
		from info) as information on
		et.employee_id = information.employee_id
		
	inner join territories t on
		t.territory_id = et.territory_id
	inner join region r on
		r.region_id = t.region_id
	group by
		r.region_id ) as datee
		
inner join region r2 on
	datee.region_id = r2.region_id;

