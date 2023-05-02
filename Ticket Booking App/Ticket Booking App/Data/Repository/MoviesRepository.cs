using Dapper;
using System.Data;
using System.Data.SqlClient;
using Ticket_Booking_App.Models;
namespace Ticket_Booking_App.Data.Repository
{
    public class MoviesRepository : IMoviesRepository
    {
        private readonly IConfiguration configuration;
        private readonly SqlConnection _con;
        private object posterBytes;

        public MoviesRepository(IConfiguration configuration)
        {
            this.configuration = configuration;
            _con = new SqlConnection(configuration.GetConnectionString("TicketConnection"));
        }

        public async Task<ResponseModel> AddAsync(Movies model)
        {
            var sql = "sp_insert_movies";


            var result = await _con.QueryAsync(sql, new
            {
                @movie_name = model.movie_name,
                @movie_categories = model.movie_categories,
                @movie_theater = model.movie_theater,
                @movie_poster = model.movie_poster,
                @movie_status = model.movie_status,
                @movie_showtiming = model.movie_showtiming,
                @movie_timeduration = model.movie_timeduration,
                @movie_director = model.movie_director,
                @movie_cast = model.movie_cast,
                @movie_thumbnail = model.movie_thumbnail,
                @movie_ytlink= model.movie_ytlink,
                @movie_createdate = model.movie_createdate,
                @movie_updatedate = model.movie_updatedate
            }, commandType: CommandType.StoredProcedure);

            return new ResponseModel
            {
                Data = result
            };
        }

        public async Task<ResponseModel> DeleteAsync(int movie_id)
        {
            var sql = "UPDATE tbl_movies SET movie_status = 'deleted' WHERE movie_id = @movie_id";

            {

                var result = await _con.ExecuteAsync(sql, new { movie_id = movie_id });
                return new ResponseModel
                {
                    SuccessMessage = "Deleted"
                };
            }
        }

        public async Task<IReadOnlyList<Movies>> GetAllAsync()
        {
            var sql = "SELECT * FROM tbl_movies WHERE movie_status <> 'deleted'";
            {

                var result = await _con.QueryAsync<Movies>(sql);
                return (IReadOnlyList<Movies>)result.ToList();
            }
        }

        public async Task<ResponseModel>GetByIdAsync(int id)
        {
            var sql = "SELECT * FROM tbl_movies WHERE movie_id = @movie_id";

            {
                //_con.Open();
                var result = await _con.QuerySingleOrDefaultAsync<Movies>(sql, new { @movie_id = id });
                return new ResponseModel
                {
                    Data = result
                };
            }
        }

        public async Task<ResponseModel>UpdateAsync(Movies model)
        {
            var sql = "sp_update_movies";

            {

                var result = await _con.QueryAsync(sql, new
                {
                    @movie_id=model.movie_id,
                    @movie_name = model.movie_name,
                    @movie_categories = model.movie_categories,
                    @movie_theater = model.movie_theater,
                    @movie_poster = model.movie_poster,
                    @movie_status = model.movie_status,
                    @movie_showtiming = model.movie_showtiming,
                    @movie_timeduration = model.movie_timeduration,
                    @movie_director = model.movie_director,
                    @movie_cast = model.movie_cast,
                    @movie_thumbnail = model.movie_thumbnail,
                    @movie_ytlink = model.movie_ytlink,
                    @movie_createdate = model.movie_createdate,
                    @movie_updatedate = model.movie_updatedate,


                }, commandType: CommandType.StoredProcedure);


            }
            return new ResponseModel
            {

            };
        }
    }
}
