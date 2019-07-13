using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CashRegister.Data.Entities;
using CashRegister.Data.Entities.Models;
using CashRegister.Domain.Repositories.Interfaces;

namespace CashRegister.Domain.Repositories.Implementations
{
    public class RegisterRepository : IRegisterRepository
    {
        public RegisterRepository(CashRegisterContext context)
        {
            _context = context;
        }

        private CashRegisterContext _context { get; set; }

        public List<Register> GetAllRegisters()
        {
            return _context.Registers.ToList();
        }
    }
}
