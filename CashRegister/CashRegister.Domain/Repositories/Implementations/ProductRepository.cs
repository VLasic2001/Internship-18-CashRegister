using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CashRegister.Data.Entities;
using CashRegister.Data.Entities.Models;
using CashRegister.Domain.Repositories.Interfaces;

namespace CashRegister.Domain.Repositories.Implementations
{
    public class ProductRepository : IProductRepository
    {
        public ProductRepository(CashRegisterContext context)
        {
            _context = context;
        }

        private readonly CashRegisterContext _context;

        public List<Product> GetAllProducts()
        {
            return _context.Products.ToList();
        }

        public bool AddProduct(Product productToAdd)
        {
            var doesProductExist = _context.Products.Any(product =>
                string.Equals(product.Barcode, productToAdd.Barcode, StringComparison.CurrentCultureIgnoreCase));
            if (doesProductExist || String.IsNullOrEmpty(productToAdd.Barcode))
                return false;

            _context.Products.Add(productToAdd);
            _context.SaveChanges();
            return true;
        }

        public bool EditProduct(Product editedProduct)
        {
            var productToEdit = _context.Products.Find(editedProduct.Id);
            if (productToEdit == null)
                return false;

            var doesEditedProductExist = _context.Products.Any(product =>
                string.Equals(product.Barcode, editedProduct.Barcode, StringComparison.CurrentCultureIgnoreCase) &&
                !string.Equals(product.Name, editedProduct.Name, StringComparison.CurrentCultureIgnoreCase));
            if (doesEditedProductExist || String.IsNullOrEmpty(editedProduct.Barcode))
                return false;  

            productToEdit.Barcode = editedProduct.Barcode;
            productToEdit.Type = editedProduct.Type;
            productToEdit.PriceWithoutTax = editedProduct.PriceWithoutTax;

            _context.SaveChanges();

            return true;
        }

        public Product GetProductById(int id)
        {
            return _context.Products.Find(id);
        }
    }
}
