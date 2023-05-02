using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Ticket_Booking_App.Data.Repository;
using Ticket_Booking_App.Models;

namespace Ticket_Booking_App.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TheaterController : Controller
    {
        private readonly ITheaterRepository _theaterRepository;

        public TheaterController(ITheaterRepository theaterRepository)
        {
            this._theaterRepository = theaterRepository;
        }

        [EnableCors("AllowOrigin")]
        [HttpGet]
        
        public async Task<IActionResult> GetAllAsync()
        {
            var data = await _theaterRepository.GetAllAsync();
            return Ok(data);
        }

        [HttpPost]
        
        public async Task<IActionResult> Theater([FromBody] Theater theater)
        {
            if (theater != null)
            {
                theater.theater_status = "online";
                var data = await _theaterRepository.AddAsync(theater);
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

        [HttpDelete("{theater_id}")]
       
        public async Task<IActionResult> Delete(int theater_id)
        {
            var data = await _theaterRepository.DeleteAsync(theater_id);
            return Ok(data);
        }

        [HttpPut]
        public async Task<IActionResult> Update(Theater theater)
        {
            var data = await _theaterRepository.UpdateAsync(theater);
            return Ok(data);
        }

        [HttpGet("{theater_id}")]
        public async Task<IActionResult> Get(int theater_id)
        {
            var theater = await _theaterRepository.GetByIdAsync(theater_id);
            if (theater == null)
            {
                return NotFound();
            }
            return Ok(theater.Data);
        }
    }
}
