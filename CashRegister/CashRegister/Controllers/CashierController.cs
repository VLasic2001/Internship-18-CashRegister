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
    [Route("api/cashiers")]
    [ApiController]
    public class CashierController : ControllerBase
    {
        public CashierController(ICashierRepository cashierRepository)
        {
            _cashierRepository = cashierRepository;
        }

        private readonly ICashierRepository _cashierRepository;

        [HttpGet("all")]
        public IActionResult GetAllCashiers()
        {
            return Ok(_cashierRepository.GetAllCashiers());

        }

        [HttpGet("get-by-id")]
        public IActionResult GetCashierById(int id)
        {
            var cashier = _cashierRepository.GetCashierById(id);
            if (cashier != null)
                return Ok(cashier);
            return NotFound();
        }

        [HttpGet("login")]
        public IActionResult GetCashierById(string password)
        {
            var cashier = _cashierRepository.GetCashierIdByPassword(password);
            if (cashier != 0)
                return Ok(cashier);
            return NotFound();
        }
    }
}
