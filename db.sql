drop table tbl_profiles;

create table tbl_pro_profiles (
   pro_id integer not null identity,
   pro_name varchar(80),
   pro_email varchar(80));

alter table tbl_pro_profiles add constraint pk_pro primary key (pro_id);

select * from tbl_pro_profiles;
insert into tbl_pro_profiles (pro_name, pro_email) values ('name 1', 'email 1');
insert into tbl_pro_profiles (pro_name, pro_email) values ('name 2', 'email 2');