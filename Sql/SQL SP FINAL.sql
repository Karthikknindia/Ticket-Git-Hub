

select *From tbl_login
SELECT * FROM tbl_theater
SELECT * FROM tbl_movies
SELECT * FROM tbl_booking









drop procedure sp_update_theater


ALTER Procedure sp_insert_error (@Message nvarchar(max),@StackTrace nvarchar(max),@Timestamp Datetime)
as
begin
insert into tbl_error values (@Message,@StackTrace,@Timestamp)
end






--------------------------------------Login-----------------------------------------

CREATE PROCEDURE sp_insert_login (@login_name nvarchar(50), @login_email nvarchar(50),@login_password nvarchar(50),@login_createdate DATETIME,@login_status nvarchar(50),@login_usertype nvarchar(50) )
as
begin
insert into tbl_login values (@login_name,@login_email,@login_password,@login_createdate,@login_status,@login_usertype)
end




CREATE PROCEDURE sp_get_all_logins
AS
BEGIN
    SELECT * FROM tbl_login
END





--alter PROCEDURE sp_update_login_status
--    @login_id INT,
--    @login_status nvarchar(50) = 'online'
--AS
--BEGIN
--    DECLARE @current_status nvarchar(50)
--    SELECT @current_status = login_status FROM tbl_login WHERE login_id = @login_id
--    IF (@current_status = 'online')
--    BEGIN
--        SET @login_status = 'offline'
--    END
--    UPDATE tbl_login SET login_status = @login_status WHERE login_id = @login_id
--END


alter PROCEDURE sp_update_login_status
    @login_id INT,
    @login_status VARCHAR(50) = 'Y'
AS
BEGIN
    UPDATE tbl_login SET login_status = @login_status WHERE login_id = @login_id
END



alter PROCEDURE sp_update_login_status_offline
    @login_id INT,
    @login_status nvarchar(50) = 'N'
AS
BEGIN
    UPDATE tbl_login SET login_status = @login_status WHERE login_id = @login_id
END




CREATE PROCEDURE sp_login_by_id
    @login_id INT
AS
BEGIN
    SELECT * FROM tbl_login WHERE login_id = @login_id
END




alter procedure sp_update(@login_name nvarchar(50),@login_email nvarchar(50),@login_password nvarchar(50),@login_createdate DATETIME,@login_status nvarchar(50))
as
begin
update tbl_login  set login_name= @login_name ,login_email=@login_email,  login_password = @login_password, login_createdate=@login_createdate,login_status=@login_status
end




alter procedure sp_update(@login_status nvarchar(50))
as
begin
update tbl_login  set login_status=@login_status
end







----------------------------------------Movies-------------------------------------------

ALTER Procedure sp_insert_movies (@movie_name nvarchar(50),@movie_categories nvarchar(50),@movie_theater nvarchar(max),@movie_poster nvarchar(MAX), @movie_showtiming  nvarchar(50),@movie_status  nvarchar(50),@movie_director nvarchar(50),@movie_timeduration nvarchar(50),@movie_cast nvarchar(MAX) ,@movie_thumbnail nvarchar(MAX),@movie_ytlink nvarchar(MAX),@movie_createdate DATETIME,@movie_updatedate DATETIME)
as
begin
insert into tbl_movies values (@movie_name,@movie_categories,@movie_theater,@movie_poster,@movie_showtiming,@movie_status,@movie_timeduration,@movie_director,@movie_cast,@movie_thumbnail,@movie_ytlink,@movie_createdate,@movie_updatedate)
end




ALTER PROCEDURE sp_get_movies
AS
BEGIN
    SELECT * FROM tbl_movies WHERE movie_status <> 'N'
END

CREATE PROCEDURE sp_get_movies_by_id
@movie_id INT
as
begin
SELECT * FROM tbl_movies WHERE movie_id = @movie_id
end




ALTER PROCEDURE sp_delete_movie
    @movie_id INT
AS
BEGIN
    UPDATE tbl_movies
    SET movie_status = 'N'
    WHERE movie_id = @movie_id
END



ALTER PROCEDURE sp_update_movies
    @movie_id INT,
    @movie_name NVARCHAR(50),
    @movie_categories NVARCHAR(50),
    @movie_theater NVARCHAR(max),
    @movie_poster nvarchar(MAX),
	
    @movie_showtiming NVARCHAR(50),
    @movie_status NVARCHAR(50),
    @movie_director NVARCHAR(50),
    @movie_timeduration NVARCHAR(50),
    @movie_cast NVARCHAR(MAX),
	@movie_thumbnail NVARCHAR(MAX),
	@movie_ytlink NVARCHAR(MAX),
	@movie_createdate DATETIME,
    @movie_updatedate DATETIME
AS
BEGIN
    UPDATE tbl_movies
    SET 
        movie_name = @movie_name,
        movie_categories = @movie_categories,
        movie_theater = @movie_theater,
        movie_poster = @movie_poster,
		
        movie_showtiming = @movie_showtiming,
        movie_status = @movie_status,
        movie_director = @movie_director,
        movie_timeduration = @movie_timeduration,
        movie_cast = @movie_cast,
		movie_thumbnail = @movie_thumbnail,
		movie_ytlink =@movie_ytlink,
		movie_createdate=@movie_createdate,
        movie_updatedate = @movie_updatedate
    WHERE movie_id = @movie_id
END





------------------------------Theaters-------------------------------------------------


alter procedure sp_insert_theater(@theater_name nvarchar(50),@theater_capacity int,@theater_location nvarchar(50),@theater_screen nvarchar(50),@theater_status nvarchar(50),@theater_datetime DATETIME,@theater_createdate DATETIME ,@theater_updatedate DATETIME)
as
begin
insert into tbl_theater values (@theater_name,@theater_capacity,@theater_location,@theater_screen,@theater_status,@theater_datetime,@theater_createdate,@theater_updatedate)
end



ALTER PROCEDURE sp_delete_theater
    @theater_id INT
AS
BEGIN
    UPDATE tbl_theater
    SET theater_status = 'N'
    WHERE theater_id = @theater_id
END


ALTER PROCEDURE sp_get_all_theaters
AS
BEGIN
    SELECT * 
    FROM tbl_theater 
    WHERE theater_status <> 'N'
END


CREATE PROCEDURE get_theater_by_id
    @theater_id INT
AS
BEGIN
    SELECT * 
    FROM tbl_theater 
    WHERE theater_id = @theater_id
END



alter PROCEDURE sp_update_theater
    @theater_id INT,
    @theater_name NVARCHAR(50),
    @theater_capacity INT,
    @theater_location NVARCHAR(50),
    @theater_screen NVARCHAR(50),
    @theater_status NVARCHAR(50),
    @theater_datetime DATETIME,
    @theater_createdate DATETIME,
    @theater_updatedate DATETIME
	

AS
BEGIN
    UPDATE tbl_theater
    SET theater_name = @theater_name,
        theater_capacity = @theater_capacity,
        theater_location = @theater_location,
        theater_screen = @theater_screen,
        theater_status = @theater_status,
        theater_datetime = @theater_datetime,
        theater_createdate = @theater_createdate,
        theater_updatedate = @theater_updatedate
		
    WHERE theater_id = @theater_id;
END









----------------------------------------Bookings--------------------------------------------------


alter Procedure sp_insert_booking (@booking_name nvarchar(MAX),@booking_email nvarchar(max),@booking_seats nvarchar(max),@booking_movie nvarchar(50),@booking_date nvarchar(50),@booking_poster nvarchar(max),@booking_amount nvarchar(max),@booking_theater nvarchar(50),@booking_showtime nvarchar(50) , @booking_status nvarchar(50),@booking_createdate DATETIME,@booking_updatedate datetime)
as
begin
insert into tbl_booking values (@booking_name,@booking_email,@booking_seats,@booking_movie,@booking_date,@booking_poster,@booking_amount,@booking_theater,@booking_showtime,@booking_status,@booking_createdate,@booking_updatedate)
end



CREATE PROCEDURE sp_insert_booking_by_id
    @booking_id INT
AS
BEGIN
    SELECT * FROM tbl_booking WHERE booking_id = @booking_id
END



alter PROCEDURE sp_delete_booking_by_id
    @booking_id INT
AS
BEGIN
    SELECT * FROM tbl_booking WHERE booking_id = @booking_id
END


CREATE PROCEDURE sp_get_all_bookings
AS
BEGIN
    SELECT * FROM tbl_booking
END

----------------------------------------------------------------Token-------------------------------------------------------------------------
--alter PROCEDURE sp_insert_token (@token nvarchar(50), @login_name nvarchar(50),@token_status nvarchar(50)  )
--as
--begin
--insert into tbl_token values (@token,@login_name,@token_status)
--end

truncate table tbl_token

ALTER PROCEDURE sp_insert_token 
 
  @login_name nvarchar(MAX),
   @token nvarchar(MAX), 
  @token_status nvarchar(MAX),
  @user_status nvarchar(50),
  @token_createddate datetime,
  @expiration_date datetime
AS
BEGIN
  INSERT INTO tbl_token values (@login_name,@token,  @token_status, @user_status,@token_createddate,@expiration_date)
END





alter PROCEDURE sp_update_token_status
@token nvarchar(MAX),
    @user_status nvarchar(MAX)
	
AS
BEGIN
    UPDATE tbl_token
    SET user_status = @user_status
	WHERE token=@token
END


--ALTER PROCEDURE sp_update_token_status
--@token nvarchar(MAX),
--@user_status nvarchar(MAX),
--@token_status nvarchar(max)
--AS
--BEGIN
--    UPDATE tbl_token
--    SET user_status = @user_status,
--        token_status = CASE 
--                            WHEN DATEDIFF(minute, token_createddate, GETDATE()) >= 10 THEN 'expired'
--                            ELSE @token_status
--                        END
--    WHERE token = @token
--END


