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
    public class CustomersController : ControllerBase
    {
        private readonly MVPStoreDBContext _context;

        public CustomersController(MVPStoreDBContext context)
        {
            _context = context;
        }

        // GET: api/Customers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MVPCustomer>>> GetMVPCustomers()
        {
            return await _context.MVPCustomers.ToListAsync();
        }

        // GET: api/Customers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MVPCustomer>> GetMVPCustomer(int id)
        {
            var mVPCustomer = await _context.MVPCustomers.FindAsync(id);

            if (mVPCustomer == null)
            {
                return NotFound();
            }

            return mVPCustomer;
        }

        // PUT: api/Customers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMVPCustomer(int id, MVPCustomer mVPCustomer)
        {
            if (id != mVPCustomer.customerID)
            {
                return BadRequest();
            }

            _context.Entry(mVPCustomer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MVPCustomerExists(id))
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

        // POST: api/Customers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MVPCustomer>> PostMVPCustomer(MVPCustomer mVPCustomer)
        {
            _context.MVPCustomers.Add(mVPCustomer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMVPCustomer", new { id = mVPCustomer.customerID }, mVPCustomer);
        }

        // DELETE: api/Customers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMVPCustomer(int id)
        {
            var mVPCustomer = await _context.MVPCustomers.FindAsync(id);
            if (mVPCustomer == null)
            {
                return NotFound();
            }

            _context.MVPCustomers.Remove(mVPCustomer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MVPCustomerExists(int id)
        {
            return _context.MVPCustomers.Any(e => e.customerID == id);
        }
    }
}
