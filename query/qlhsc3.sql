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

CREATE TABLE SUBJECT (
	ID int,
	Name varchar(30),
	PRIMARY KEY (ID),
);

CREATE TABLE EXAM_RESULT (
    ExamID int,
    StudentID varchar(10),
	Mark float,
);

CREATE TABLE PARAMETERS (
	MinAge int,
	MaxAge int,
	MaxStudent int,
	NumOfClass int,
	NameClass varchar(300),
	NumOfSubject int,
	NameOfSubject varchar(300),
	StandardScore float,	
)

CREATE TABLE RESULT(
	id INT PRIMARY KEY,
	studentId VARCHAR(10),
	subjectId INT,
	semeter INT,
	mark FLOAT
)

CREATE TABLE CLASS_SUBJECT(
	classId VARCHAR(10),
	subjectId INT,
	PRIMARY KEY (classId, subjectId)
)


CREATE TABLE SEMETER(
	id INT PRIMARY KEY,
	name VARCHAR(2),
	yearId INT
)

CREATE TABLE EXAM(
	id INT PRIMARY KEY,
	name nvarchar(50),
	subjectId int,
	classId varchar(10),
	semeterId int
)
