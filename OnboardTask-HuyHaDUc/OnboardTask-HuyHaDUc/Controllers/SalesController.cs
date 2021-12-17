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
    public class SalesController : ControllerBase
    {
        private readonly MVPStoreDBContext _context;

        public SalesController(MVPStoreDBContext context)
        {
            _context = context;
        }

        // GET: api/Sales
        [HttpGet]
        public IEnumerable<MVPSales> GetMVPSales()
        {
            var sales = _context.MVPSales
                .Include(p => p.customer)
                .Include(p => p.product)
                .Include(p => p.store)
                .ToList();
            return _context.MVPSales;
            //return await _context.MVPSales.ToListAsync();
        }

        // GET: api/Sales/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MVPSales>> GetMVPSales(int id)
        {
            var mVPSales = await _context.MVPSales.FindAsync(id);

            if (mVPSales == null)
            {
                return NotFound();
            }

            return mVPSales;
        }

        // PUT: api/Sales/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMVPSales(int id, MVPSales mVPSales)
        {
            if (id != mVPSales.id)
            {
                return BadRequest();
            }

            _context.Entry(mVPSales).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MVPSalesExists(id))
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

        // POST: api/Sales
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MVPSales>> PostMVPSales(MVPSales mVPSales)
        {
            _context.MVPSales.Add(mVPSales);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMVPSales", new { id = mVPSales.id }, mVPSales);
        }

        // DELETE: api/Sales/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMVPSales(int id)
        {
            var mVPSales = await _context.MVPSales.FindAsync(id);
            if (mVPSales == null)
            {
                return NotFound();
            }

            _context.MVPSales.Remove(mVPSales);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MVPSalesExists(int id)
        {
            return _context.MVPSales.Any(e => e.id == id);
        }
    }
}
