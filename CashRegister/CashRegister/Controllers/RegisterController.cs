using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CashRegister.Data.Entities.Models;
using CashRegister.Domain.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CashRegister.Web.Controllers
{
    [Route("api/registers")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        public RegisterController(IRegisterRepository registerRepository)
        {
            _registerRepository = registerRepository;
        }

        private readonly IRegisterRepository _registerRepository;

        [HttpGet("all")]
        public IActionResult GetAllRegisters()
        {
            return Ok(_registerRepository.GetAllRegisters());

        }
    }
}
