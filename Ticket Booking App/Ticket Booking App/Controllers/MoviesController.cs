using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Ticket_Booking_App.Data.Repository;
using Ticket_Booking_App.Models;

namespace Ticket_Booking_App.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MoviesController : Controller
    {

        private readonly IMoviesRepository _moviesRepository;

        public MoviesController(IMoviesRepository _moviesRepository)
        {
            this._moviesRepository = _moviesRepository;
        }

        [EnableCors("AllowOrigin")]
        [HttpPost]
        [Route("GetAllMovies")]
        public async Task<IActionResult> GetAllAsync()
        {
            var data = await _moviesRepository.GetAllAsync();
            return Ok(data);
        }
        [HttpPost]
        [Route("AddMovies")]
        public async Task<IActionResult> Movies([FromBody] Movies movies)
        {
            if (movies != null)
            {
                movies.movie_status= "online";
                var data = await _moviesRepository.AddAsync(movies);
                if (data != null)
                {
                    return Ok(new
                    {
                        status = "200",
                        message = "success",
                        data = new
                        {
                            data
                        }
                    });
                }
                else
                {
                    return Ok(new
                    {
                        status = "404",
                        message = "Not Found",

                    });
                }


            }
            else
            {
                return NoContent();
            }
        }
        [HttpDelete("{movie_id}")]
        
        public async Task<IActionResult> Delete(int movie_id)
        {
            var data = await _moviesRepository.DeleteAsync(movie_id);
            return Ok(data);
        }
        [HttpPost]
        [Route("Update")]
        public async Task<IActionResult> Update(Movies movies)
        {
            var data = await _moviesRepository.UpdateAsync(movies);
            return Ok(data);
        }

        [HttpPost]
        [Route("GetById")]
        public async Task<IActionResult> Get(int movie_id)
        {
            var movies = await _moviesRepository.GetByIdAsync(movie_id);
            if (movies == null)
            {
                return NotFound();
            }
            return Ok(movies.Data);
        }
    }
}
