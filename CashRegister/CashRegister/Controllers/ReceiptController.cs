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
    [Route("api/receipts")]
    [ApiController]
    public class ReceiptController : ControllerBase
    {
        public ReceiptController(IReceiptRepository receiptRepository)
        {
            _receiptRepository = receiptRepository;
        }

        private readonly IReceiptRepository _receiptRepository;

        [HttpGet("all")]
        public IActionResult GetAllReceipts()
        {
            return Ok(_receiptRepository.GetAllReceipts());
        }

        [HttpPost("add")]
        public IActionResult AddReceipt(Receipt receiptToAdd)
        {
            var receiptGuid = _receiptRepository.AddReceipt(receiptToAdd);
            if (receiptGuid)
                return Ok();
            return Forbid();
        }

        [HttpGet("get-by-id")]
        public IActionResult GetReceiptById(Guid id)
        {
            var receipt = _receiptRepository.GetReceiptById(id);
            if (receipt != null)
                return Ok(receipt);
            return NotFound();
        }

        [HttpGet("search-by-date")]
        public IActionResult GetReceiptsByDate(long date, int page)
        {
            var receipt = _receiptRepository.GetReceiptsByDate(date, page);
            if (receipt != null)
                return Ok(receipt);
            return NotFound();
        }
    }
}
