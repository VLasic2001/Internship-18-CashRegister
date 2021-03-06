﻿using System;
using System.Collections.Generic;
using System.Text;
using CashRegister.Data.Entities.Models;

namespace CashRegister.Domain.Repositories.Interfaces
{
    public interface IProductRepository
    {
        List<Product> GetAllProducts();

        bool AddProduct(Product productToAdd);

        bool EditProduct(Product editedProduct);

        Product GetProductById(int id);

        List<Product> GetProductsWithNameContainingString(string search);

        List<Product> GetProductsWithBarcodeContainingString(string search);

        bool AddProductAmount(List<ProductAmount> products);
    }
}
