CREATE DATABASE [QLHSC3]

USE QLHSC3
GO

CREATE TABLE STUDENT (
	id varchar(10),
	name nvarchar(50),
	gender nvarchar(10),
	dob date,
	email varchar(100),
	address varchar(300),
	class_id varchar(10),

	PRIMARY KEY (id),
)

CREATE TABLE CLASS (
	id varchar(10),
	name varchar(10),
	amountStudent int,
	year_id int,

	PRIMARY KEY (id),
)	

CREATE TABLE YEAR (
	id int,
	name varchar(10),

	PRIMARY KEY (id),
)