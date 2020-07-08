using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Calypso.ai.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Calypso.ai.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticsController : ControllerBase
    {
        private IWebHostEnvironment _environment;
        private readonly CSVFileContext _context;

        public StatisticsController(IWebHostEnvironment environment, CSVFileContext context)
        {
            _environment = environment;
            _context = context;
        }

        // GET: api/Statistics
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Statistic>>> GetStatistics()
        {
            // get the totals of all of the years across all of the files
            return await _context.Statistics
                .GroupBy(s => s.Year)
                .Select(g => new Statistic() { Year = g.Key, Count = g.Sum(i => i.Count) })
                .OrderBy(s => s.Year)
                .ToListAsync();
        }

        // GET: api/Statistics/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Statistic>>> GetStatisticsForCSVFile(Guid id)
        {
            var statistics = await _context.Statistics.Where(x => x.CSVFileId == id).ToListAsync();

            if (statistics == null)
            {
                return NotFound();
            }

            return statistics;
        }
    }
}