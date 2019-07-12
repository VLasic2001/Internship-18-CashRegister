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
    [Route("api/products")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        public ProductController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        private readonly IProductRepository _productRepository;

        [HttpGet("all")]
        public IActionResult GetAllProducts()
        {
            return Ok(_productRepository.GetAllProducts());

        }

        [HttpPost("add")]
        public IActionResult AddProduct(Product productToAdd)
        {
            var wasAddSuccessful = _productRepository.AddProduct(productToAdd);
            if (wasAddSuccessful)
                return Ok();
            return Forbid();
        }

        [HttpPost("edit")]
        public IActionResult EditProduct(Product editedProduct)
        {
            var wasEditSuccessful = _productRepository.EditProduct(editedProduct);
            if (wasEditSuccessful)
                return Ok(wasEditSuccessful);
            return Forbid();
        }

        [HttpGet("get-by-id")]
        public IActionResult GetProductById(int id)
        {
            var product = _productRepository.GetProductById(id);
            if (product != null)
                return Ok(product);
            return NotFound();
        }

        [HttpGet("search-products")]
        public IActionResult GetProductsContainingString(string search)
        {
            var products = _productRepository.GetProductsContainingString(search);
            if (products != null)
                return Ok(products);
            return NotFound();
        }

        [HttpPost("delivery")]
        public IActionResult IncreaseProductAmounts(List<ProductAmount> productAmounts)
        {
            var wasAddSuccessful = _productRepository.AddProductAmount(productAmounts);
            if (wasAddSuccessful)
                return Ok();
            return NotFound();
        }
    }
}
