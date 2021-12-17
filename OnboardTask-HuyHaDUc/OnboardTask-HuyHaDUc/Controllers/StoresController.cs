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
    public class StoresController : ControllerBase
    {
        private readonly MVPStoreDBContext _context;

        public StoresController(MVPStoreDBContext context)
        {
            _context = context;
        }

        // GET: api/Stores
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MVPStore>>> GetMVPStores()
        {
            return await _context.MVPStores.ToListAsync();
        }

        // GET: api/Stores/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MVPStore>> GetMVPStore(int id)
        {
            var mVPStore = await _context.MVPStores.FindAsync(id);

            if (mVPStore == null)
            {
                return NotFound();
            }

            return mVPStore;
        }

        // PUT: api/Stores/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMVPStore(int id, MVPStore mVPStore)
        {
            if (id != mVPStore.storeID)
            {
                return BadRequest();
            }

            _context.Entry(mVPStore).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MVPStoreExists(id))
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

        // POST: api/Stores
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MVPStore>> PostMVPStore(MVPStore mVPStore)
        {
            _context.MVPStores.Add(mVPStore);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMVPStore", new { id = mVPStore.storeID }, mVPStore);
        }

        // DELETE: api/Stores/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMVPStore(int id)
        {
            var mVPStore = await _context.MVPStores.FindAsync(id);
            if (mVPStore == null)
            {
                return NotFound();
            }

            _context.MVPStores.Remove(mVPStore);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MVPStoreExists(int id)
        {
            return _context.MVPStores.Any(e => e.storeID == id);
        }
    }
}
