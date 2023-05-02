using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Ticket_Booking_App.Data.Repository;
using Ticket_Booking_App.Models;

namespace Ticket_Booking_App.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingController : Controller
    {

        private readonly IBookingRepository _bookingRepository;
        public BookingController(IBookingRepository bookingRepository)
        {
            this._bookingRepository = bookingRepository;
        }

        [EnableCors("AllowOrigin")]
        [HttpGet]

        public async Task<IActionResult> GetAllAsync()
        {
            var data = await _bookingRepository.GetAllAsync();
           
            return Ok(data);


        }
        [HttpPost]
        public async Task<IActionResult> Booking([FromBody] Booking booking)
        {
            if (booking != null)
            {
                booking.booking_status = "success";
                var data = await _bookingRepository.AddAsync(booking);
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

        [HttpGet]
        [Route("getbyname")]
        public async Task<IActionResult> GetByNameAsync(string username)
        {
            var data = await _bookingRepository.GetAllAsync();
            if (!string.IsNullOrEmpty(username))
            {
                data = data.Where(x => x.booking_name.ToLower() == username.ToLower()).ToList();
            }
            return Ok(data);
        }

    

     
    }
}
