using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnboardTask_HuyHaDUc.Models;

namespace OnboardTask_HuyHaDUc.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly MVPStoreDBContext _context;

        public ProductsController(MVPStoreDBContext context)
        {
            _context = context;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MVPProduct>>> GetMVPProducts()
        {
            return await _context.MVPProducts.ToListAsync();
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MVPProduct>> GetMVPProduct(int id)
        {
            var mVPProduct = await _context.MVPProducts.FindAsync(id);

            if (mVPProduct == null)
            {
                return NotFound();
            }

            return mVPProduct;
        }

        // PUT: api/Products/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMVPProduct(int id, MVPProduct mVPProduct)
        {
            if (id != mVPProduct.productID)
            {
                return BadRequest();
            }

            _context.Entry(mVPProduct).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MVPProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Products
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MVPProduct>> PostMVPProduct(MVPProduct mVPProduct)
        {
            _context.MVPProducts.Add(mVPProduct);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMVPProduct", new { id = mVPProduct.productID }, mVPProduct);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMVPProduct(int id)
        {
            var mVPProduct = await _context.MVPProducts.FindAsync(id);
            if (mVPProduct == null)
            {
                return NotFound();
            }

            _context.MVPProducts.Remove(mVPProduct);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MVPProductExists(int id)
        {
            return _context.MVPProducts.Any(e => e.productID == id);
        }
    }
}
