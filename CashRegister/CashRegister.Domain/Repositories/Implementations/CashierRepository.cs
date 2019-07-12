using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CashRegister.Data.Entities;
using CashRegister.Data.Entities.Models;
using CashRegister.Domain.Repositories.Interfaces;

namespace CashRegister.Domain.Repositories.Implementations
{
    public class CashierRepository : ICashierRepository
    {
        public CashierRepository(CashRegisterContext context)
        {
            _context = context;
        }

        private CashRegisterContext _context { get; set; }

        public List<Cashier> GetAllCashiers()
        {
            return _context.Cashiers.ToList();
        }

        public Cashier GetCashierById(int id)
        {
            return _context.Cashiers.Find(id);
        }
    }
}
