CREATE DATABASE [QLHSC3]

--use master
--DROP database [QLHSC3]

--DROP table
-- DROP TABLE PARAMETERS; 
-- DROP TABLE EXAM_RESULT; 
-- DROP TABLE RESULT; 
-- DROP TABLE EXAM; 
-- DROP TABLE STUDENT; 
-- DROP TABLE CLASS_SUBJECT; 
-- DROP TABLE SUBJECT; 
-- DROP TABLE CLASS;
-- DROP TABLE SEMESTER;
-- DROP TABLE YEAR; 
--DROP TABLE ACCOUNT;
--DROP PROCEDURE create_account;


USE QLHSC3
GO

CREATE TABLE STUDENT (
	id varchar(10),
	name nvarchar(50),
	gender nvarchar(10),
	dob date,
	email varchar(100),
	address nvarchar(300),
	class_id int,

	PRIMARY KEY (id),
)

CREATE TABLE CLASS (
	id int IDENTITY(1,1),
	name varchar(10),
	amount_student int,
	_year varchar(10),
	teacher nvarchar(50),

	PRIMARY KEY (id),
)	

CREATE TABLE YEAR (
	_year varchar(10),
	PRIMARY KEY (_year),
)

CREATE TABLE SUBJECT (
	id int IDENTITY(1,1),
	name nvarchar(30),
	_year varchar(10),

	PRIMARY KEY (id),
);

CREATE TABLE EXAM_RESULT (
    exam_id int,
    student_id varchar(10),
	mark float,
);

CREATE TABLE PARAMETERS (
	_year varchar(10),
	min_age int,
	max_age int,
	max_student int,
	num_of_class_10 int,
	num_of_class_11 int,
	num_of_class_12 int,
	name_class_10  varchar(300),
	name_class_11  varchar(300),
	name_class_12  varchar(300),
	num_of_subject int,
	name_of_subject nvarchar(1000),
	standard_score float,	
)

CREATE TABLE RESULT(
	id INT IDENTITY(1,1),
	student_id VARCHAR(10),
	subject_id INT,
	_semester INT,
	_year varchar(10),
	mark FLOAT,

	PRIMARY KEY(id),
)

CREATE TABLE CLASS_SUBJECT(
	class_id int,
	subject_id INT,

	PRIMARY KEY (class_id, subject_id)
)


CREATE TABLE SEMESTER(
	_semester INT,
	_year varchar(10)

	PRIMARY KEY (_semester,_year),
)

CREATE TABLE EXAM(
	id INT IDENTITY(1,1),
	name nvarchar(50),
	subject_id int,
	class_id int,
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


-- insert fake data to dev

INSERT INTO YEAR (_year) values ('2021-2022');
INSERT INTO SEMESTER(_semester, _year) values (1, '2021-2022');
--class
INSERT INTO CLASS(name, amount_student, _year, teacher) values ('10A1', 0, '2021-2022', "");
INSERT INTO CLASS(name, amount_student, _year, teacher) values ('10A2', 0, '2021-2022', "");
INSERT INTO CLASS(name, amount_student, _year, teacher) values ('10A3', 0, '2021-2022', "");
INSERT INTO CLASS(name, amount_student, _year, teacher) values ('10A4', 0, '2021-2022', "");
INSERT INTO CLASS(name, amount_student, _year, teacher) values ('11A1', 0, '2021-2022', "");
INSERT INTO CLASS(name, amount_student, _year, teacher) values ('11A2', 0, '2021-2022', "");
INSERT INTO CLASS(name, amount_student, _year, teacher) values ('11A3', 0, '2021-2022', "");
INSERT INTO CLASS(name, amount_student, _year, teacher) values ('12A1', 0, '2021-2022', "");
INSERT INTO CLASS(name, amount_student, _year, teacher) values ('12A2', 0, '2021-2022', "");
--subject, ""
INSERT INTO SUBJECT(name, _year) values (N'Toán', '2021-2022');
INSERT INTO SUBJECT(name, _year) values (N'Lý', '2021-2022');
INSERT INTO SUBJECT(name, _year) values (N'Hóa', '2021-2022');
INSERT INTO SUBJECT(name, _year) values (N'Văn', '2021-2022');
INSERT INTO SUBJECT(name, _year) values (N'Sử', '2021-2022');
INSERT INTO SUBJECT(name, _year) values (N'Địa', '2021-2022');
INSERT INTO SUBJECT(name, _year) values (N'Đạo Đức', '2021-2022');
INSERT INTO SUBJECT(name, _year) values (N'Thể dục', '2021-2022');
INSERT INTO SUBJECT(name, _year) values (N'Sinh', '2021-2022');

INSERT INTO PARAMETERS (
	_year,
	min_age,
	max_age,
	max_student,
	num_of_class_10,
	num_of_class_11,
	num_of_class_12,
	name_class_10,
	name_class_11,
	name_class_12,
	num_of_subject,
	name_of_subject,
	standard_score)
	 values(
	'2021-2022',
	15,
	20,
	40,
	4,
	3,
	2,
	'10A1, 10A2, 10A3, 10A4',
	'11A1, 11A2, 11A3',
	'12A1, 12A2',
	9,
	N'Toán, Lý, Hóa, Sinh, Văn, Sử, Địa, Công dân, Thể dục',
	5)

-- add class procedure
CREATE PROCEDURE create_class
(
    @_year VARCHAR(10),
	@_grade INT,
	@_class_name VARCHAR(10),
    @_teacher NVARCHAR(50)
)
AS
BEGIN
	--tạo id
	--khai báo biến
    DECLARE @id INT
	DECLARE @name VARCHAR(10)
	DECLARE @max_id INT
	DECLARE @new_id INT

	-- Khai báo con trỏ
	DECLARE _cursor CURSOR FOR
	SELECT id,name FROM CLASS
	WHERE _year=@_year

	-- Mở con trỏ
	OPEN _cursor

	-- Lấy dòng đầu tiên
	FETCH NEXT FROM _cursor INTO @id,@name
	SET @max_id=@id

	-- Duyệt qua các dòng trong bảng
	WHILE @@FETCH_STATUS = 0
	BEGIN
		IF @name=@_class_name
			RETURN null
		IF @max_id<@id
			SET @max_id=@id
		-- Lấy dòng tiếp theo
		FETCH NEXT FROM _cursor INTO @id,@name
	END

	-- Đóng con trỏ
	CLOSE _cursor
	DEALLOCATE _cursor

	--new id
	SET @new_id=(@max_id+1);

	--lấy số học sinh mặc định
	DECLARE @number_student INT

	IF @_grade=10
		BEGIN
			SELECT @number_student = num_of_class_10	
			FROM PARAMETERS
			WHERE _year=@_year
		END
	ELSE IF @_grade=11
		BEGIN
			SELECT @number_student = num_of_class_11
			FROM PARAMETERS
			WHERE _year=@_year
		END
	ELSE IF @_grade=12
		BEGIN
			SELECT @number_student = num_of_class_12
			FROM PARAMETERS
			WHERE _year=@_year
		END
	
	--insert
	SET IDENTITY_INSERT CLASS ON
	INSERT INTO CLASS(id,name,amount_student,_year,teacher) VALUES (@new_id,@_class_name,@number_student,@_year,@_teacher)
	SET IDENTITY_INSERT CLASS OFF
END

--drop procedure create_class
--EXEC create_class '2021-2022', 11, '11C4', N'Lê Thị Ngọc Bích'
--select * from CLASS

-- delete class procedure
CREATE PROCEDURE delete_class
(
    @_year VARCHAR(10),
	@_class_name VARCHAR(10)
)
AS
BEGIN
	--khai báo biến
	DECLARE @id INT
	DECLARE @name VARCHAR(10)

	-- Khai báo con trỏ
	DECLARE _cursor CURSOR FOR
	SELECT id,name FROM CLASS
	WHERE _year=@_year

	-- Mở con trỏ
	OPEN _cursor

	-- Lấy dòng đầu tiên
	FETCH NEXT FROM _cursor INTO @id,@name

	-- Duyệt qua các dòng trong bảng
	WHILE @@FETCH_STATUS = 0
	BEGIN
		IF @name=@_class_name
			BREAK

		-- Lấy dòng tiếp theo
		FETCH NEXT FROM _cursor INTO @id,@name
	END

	-- Đóng con trỏ
	CLOSE _cursor
	DEALLOCATE _cursor

	--delete
	DELETE FROM CLASS WHERE id=@id
END

-- drop procedure delete_class
-- EXEC delete_class'2021-2022','11a4'
-- select * from CLASS

CREATE PROCEDURE get_courses_of_class
(
    @_year VARCHAR(10),
	@_class_name VARCHAR(10)
)
AS
BEGIN
	SELECT * FROM CLASS C join CLASS_SUBJECT CS ON C.id=CS.class_id
	join SUBJECT S ON S.id = CS.subject_id
	WHERE C._year= @_year
	AND C.name= @_class_name
END