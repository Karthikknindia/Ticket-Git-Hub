using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel;
using Ticket_Booking_App.Data.Repository;
using Ticket_Booking_App.Models;

namespace Ticket_Booking_App.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : Controller
    {

        private readonly ILoginRepository _loginRepository;
        public LoginController(ILoginRepository _loginRepository)
        {
            this._loginRepository = _loginRepository;
        }

        [EnableCors("AllowOrigin")]
        [HttpPost]
        [Route("GetAllUser")]
        public async Task<IActionResult> GetAll()
        {
            var data = await _loginRepository.GetAllAsync();
            return Ok(data);


        }
        [HttpPost]
        [Route("AddUser")]

        public async Task<IActionResult> Login([FromBody] Login login)
        {

            var userExists = (await _loginRepository.GetAllAsync()).Where(u => u.login_email == login.login_email).FirstOrDefault();
            if (userExists != null)
            {

                return Ok(new
                {
                    status = "409",
                    message = "User Already Exist",

                });
            }
            else
            {

                if (login != null)
                {
                    login.login_usertype = "u";
                   

                    var data = await _loginRepository.AddAsync(login);
                    if (data != null)
                    {
                        var retrievedLogin = (await _loginRepository.GetAllAsync()).Where(x => x.login_email == login.login_email).FirstOrDefault(); 
                        return Ok(new
                        {
                            status = "200",
                            message = "success",
                            data = new
                            {
                                retrievedLogin
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
        }
        [HttpPost]
        [Route("validate")]
        public async Task<IActionResult> Loginin([FromBody] Login login)
        {
            var data = (await _loginRepository.GetAllAsync()).Where(x => x.login_email == login.login_email && x.login_password == login.login_password).FirstOrDefault();



            if (data != null)
            {

               

                if (data.login_usertype == "a")
                {
                   
                    
                    

                    return Ok(new
                    {

                        status = "210",
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
                        status = "200",
                        message = "success",
                        data = new
                        {
                            data
                        }
                    });
                }

            }
            else
            {


                return Ok(new
                {
                    status = "404",
                    message = "Not Found",
                    data = new
                    {
                       data
                    }
                });
            }

        }

        //[HttpDelete("{login_id}")]
       
        //public async Task<IActionResult> Delete(int login_id)
        //{
        //    var data = await _loginRepository.DeleteAsync(login_id);
        //    return Ok(data);
        //}

        [HttpPost]
        [Route("Update")]
        public async Task<IActionResult> Update([FromBody] int login_id)
        {
            var data = await _loginRepository.UpdateAsync(login_id);
            return Ok(data);
        }


    }
}
