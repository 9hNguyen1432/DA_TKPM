CREATE DATABASE [QLHSC3]

--use master
--DROP database [QLHSC3]

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
	amount_student int,
	_year varchar(10),

	PRIMARY KEY (id),
)	

CREATE TABLE YEAR (
	_year varchar(10),
	PRIMARY KEY (_year),
)

CREATE TABLE SUBJECT (
	id int,
	name varchar(30),

	PRIMARY KEY (id),
);

CREATE TABLE EXAM_RESULT (
    exam_id int,
    student_id varchar(10),
	mark float,
);

CREATE TABLE PARAMETERS (
	min_age int,
	max_age int,
	max_student int,
	num_of_class int,
	name_class varchar(300),
	num_of_subject int,
	name_of_subject varchar(300),
	standard_score float,	
)

CREATE TABLE RESULT(
	id INT,
	student_id VARCHAR(10),
	subject_id INT,
	_semester INT,
	_year varchar(10),
	mark FLOAT,

	PRIMARY KEY(id),
)

CREATE TABLE CLASS_SUBJECT(
	class_id VARCHAR(10),
	subject_id INT,

	PRIMARY KEY (class_id, subject_id)
)


CREATE TABLE SEMESTER(
	_semester INT,
	_year varchar(10)

	PRIMARY KEY (_semester,_year),
)

CREATE TABLE EXAM(
	id INT,
	name nvarchar(50),
	subject_id int,
	class_id varchar(10),
	_semester INT,
	_year varchar(10)

	PRIMARY KEY (id),
)

--FOREIGN KEY

--STUDENT: 1 FK
ALTER TABLE STUDENT 
ADD CONSTRAINT FK_STUDENT_CLASS
FOREIGN KEY (class_id)
REFERENCES CLASS(id);

--CLASS: 1 FK
ALTER TABLE CLASS 
ADD CONSTRAINT FK_CLASS_YEAR
FOREIGN KEY (_year)
REFERENCES YEAR(_year);

--RESULT:  3 FK
ALTER TABLE RESULT 
ADD CONSTRAINT FK_RESULT_SUBJECT
FOREIGN KEY (subject_id)
REFERENCES SUBJECT(id);

ALTER TABLE RESULT 
ADD CONSTRAINT FK_RESULT_SEMESTER
FOREIGN KEY (_semester,_year)
REFERENCES SEMESTER(_semester,_year);

ALTER TABLE RESULT 
ADD CONSTRAINT FK_RESULT_STUDENT
FOREIGN KEY (student_id)
REFERENCES STUDENT(id);

--CLASS_SUBJECT: 2 FK
ALTER TABLE CLASS_SUBJECT
ADD CONSTRAINT FK_CS_CLASS
FOREIGN KEY (class_id)
REFERENCES CLASS(id);

ALTER TABLE CLASS_SUBJECT
ADD CONSTRAINT FK_CS_SUBJECT
FOREIGN KEY (subject_id)
REFERENCES SUBJECT(id);

--SEMESTER: 1 FK
ALTER TABLE SEMESTER
ADD CONSTRAINT FK_SEMESTER_YEAR
FOREIGN KEY (_year)
REFERENCES YEAR(_year);

--EXAM: 3 FK
ALTER TABLE EXAM
ADD CONSTRAINT FK_EXAM_SEMESTER
FOREIGN KEY (_semester,_year)
REFERENCES SEMESTER(_semester,_year);

ALTER TABLE EXAM
ADD CONSTRAINT FK_EXAM_CLASS
FOREIGN KEY (class_id)
REFERENCES CLASS(id);

ALTER TABLE EXAM
ADD CONSTRAINT FK_EXAM_SUBJECT
FOREIGN KEY (subject_id)
REFERENCES SUBJECT(id);

--EXAM_RESULT: 2 FK
ALTER TABLE EXAM_RESULT
ADD CONSTRAINT FK_ER_STUDENT
FOREIGN KEY (student_id)
REFERENCES STUDENT(id);

ALTER TABLE EXAM_RESULT
ADD CONSTRAINT FK_ER_EXAM
FOREIGN KEY (exam_id)
REFERENCES EXAM(id);

-- CREATE TABLE ACCOUNT AND PROCEDURE CREATE_ACCOUNT

CREATE TABLE ACCOUNT (
	username varchar(64),
	password varchar(64)
)


CREATE PROCEDURE create_account
(
    @_username VARCHAR(64),
    @_password VARCHAR(64)
)
AS
BEGIN
    IF EXISTS (SELECT * FROM ACCOUNT WHERE username = @_username)
    BEGIN
        PRINT 'Tai khoan da ton tai.'
    END
    ELSE
    BEGIN
        DECLARE @_crypto_pass VARCHAR(64)
        SET @_crypto_pass = CONVERT(VARCHAR(32), HashBytes('MD5', @_password), 2)
        INSERT INTO ACCOUNT VALUES (@_username, @_crypto_pass)
    END
END


EXEC create_account 'user','user'

SELECT * FROM ACCOUNT