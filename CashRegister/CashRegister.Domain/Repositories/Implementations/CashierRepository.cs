using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CashRegister.Data.Entities;
using CashRegister.Data.Entities.Models;
using CashRegister.Domain.Repositories.Interfaces;
using CashRegister.Data.Helpers;

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

        public int GetCashierIdByPassword(string password)  
        {
            return _context.Cashiers.FirstOrDefault(cashier => HashHelper.ValidatePassword(password, cashier.Password)).Id;
        }
    }
}
