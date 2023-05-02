﻿using Dapper;
using System.Data;
using System.Data.SqlClient;
using Ticket_Booking_App.Models;

namespace Ticket_Booking_App.Data.Repository
{
    public class TheaterRepository : ITheaterRepository
    {
        private readonly IConfiguration configuration;
        private readonly SqlConnection _con;

        public TheaterRepository(IConfiguration configuration)
        {
            this.configuration = configuration;
            _con = new SqlConnection(configuration.GetConnectionString("TicketConnection"));
        }
        public async Task<ResponseModel> AddAsync(Theater model)
        {
            var sql = "sp_insert_theater";

            {

                var result = await _con.QueryAsync(sql, new
                {
                    @theater_name = model.theater_name,
                    @theater_capacity = model.theater_capacity,
                    @theater_location = model.theater_location,
                    @theater_screen = model.theater_screen,                   
                    @theater_status = model.theater_status,
                    @theater_datetime = model.theater_datetime,
                    @theater_createdate = model.theater_createdate,
                    @theater_updatedate = model.theater_updatedate,
                  


                }, commandType: CommandType.StoredProcedure);


            }
            return new ResponseModel
            {

            };
        }

        public async Task<ResponseModel> DeleteAsync(int theater_id)
        {
            var sql = "UPDATE tbl_theater SET theater_status = 'deleted' WHERE theater_id = @theater_id";
            var result = await _con.ExecuteAsync(sql, new { theater_id = theater_id });

            return new ResponseModel
            {
                SuccessMessage = "Theater status updated to 'deleted'"
            };
        }


        public async Task<IReadOnlyList<Theater>> GetAllAsync()
        {
            var sql = "SELECT * FROM tbl_theater WHERE theater_status <> 'deleted'";
            {

                var result = await _con.QueryAsync<Theater>(sql);
                return (IReadOnlyList<Theater>)result.ToList();
            }
        }

        public async Task<ResponseModel> GetByIdAsync(int id)
        {
            var sql = "SELECT * FROM tbl_theater WHERE theater_id = @theater_id";

            {
                //_con.Open();
                var result = await _con.QuerySingleOrDefaultAsync<Theater>(sql, new { @theater_id = id });
                return new ResponseModel
                {
                    Data = result
                };
            }
        }

        public async Task<ResponseModel> UpdateAsync(Theater model)
        {
            var sql = "sp_update_theater";

            {

                var result = await _con.QueryAsync(sql, new
                {
                    @theater_id=model.theater_id,
                    @theater_name=model.theater_name,
                    @theater_capacity=model.theater_capacity,
                    @theater_location=model.theater_location,
                    @theater_screen=model.theater_screen,
                    @theater_status=model.theater_status,
                    @theater_datetime=model.theater_datetime,
                    @theater_createdate=model.theater_createdate,
                    @theater_updatedate=model.theater_updatedate,
                   

                }, commandType: CommandType.StoredProcedure);


            }
            return new ResponseModel
            {

            };
        }
    }
}
