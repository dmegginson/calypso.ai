using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Calypso.ai.Managers;
using Calypso.ai.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NReco.Csv;

namespace Calypso.ai.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CSVFileController : ControllerBase
    {
        private IWebHostEnvironment _environment;
        private readonly CSVFileContext _context;

        public CSVFileController(IWebHostEnvironment environment, CSVFileContext context)
        {
            _environment = environment;
            _context = context;
        }

        // GET: api/CSVFile
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CSVFile>>> GetCSVFiles()
        {
            return await _context.CSVFiles.ToListAsync();
        }

        // GET: api/CSVFile/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CSVFile>> GetCSVFile(Guid id)
        {
            var csvFile = await _context.CSVFiles.Where(x => x.Id == id).FirstOrDefaultAsync<CSVFile>();

            if (csvFile == null)
            {
                return NotFound();
            }

            return csvFile;
        }

        [HttpGet("download/{id}")]
        public async Task<IActionResult> Download(Guid id)
        {
            if (id == null || id == Guid.Empty)
            {
                return NotFound();
            }

            var file = _context.Find<CSVFile>(id);

            if (file == null || string.IsNullOrEmpty(file.Path) || string.IsNullOrWhiteSpace(file.Path))
            {
                return NotFound();
            }

            var stream = new MemoryStream();
            using var fileStream = new FileStream(file.Path, FileMode.Open);
            await fileStream.CopyToAsync(stream);
            stream.Position = 0;

            return File(stream, "text/csv");
        }

        [HttpPost]
        public async Task<ActionResult<CSVFile>> UploadCSVFile([FromForm] CSVFile csvFile)
        {
            if (csvFile == null || csvFile.File == null || csvFile.File.Length == 0 || !csvFile.File.FileName.EndsWith(".csv"))
            {
                return null;
            }

            var outputDirectory = Path.Combine(_environment.WebRootPath, "csvs");

            if (!Directory.Exists(outputDirectory))
            {
                Directory.CreateDirectory(outputDirectory);
            }

            csvFile.Id = csvFile.Id == Guid.Empty || csvFile.Id == null ? Guid.NewGuid() : csvFile.Id;
            csvFile.FileName = csvFile.File.FileName;
            csvFile.Path = Path.Combine(outputDirectory, $"{csvFile.Id}-{csvFile.FileName}");
            csvFile.Statistics = new List<Statistic>();

            var statistics = new Dictionary<int, long>();
            var csvReader = new CsvReader(new StreamReader(csvFile.File.OpenReadStream()), ",");
            var line = 1;

            try
            {

                while (csvReader.Read())
                {
                    // skip header
                    if (csvFile.HasHeaders && line == 1)
                    {
                        line++;
                        continue;
                    }

                    var entry = new Entry()
                    {
                        Id = Guid.NewGuid(),
                        CSVFileId = csvFile.Id,
                        Guid = csvReader[0],
                        Name = csvReader[1],
                        First = csvReader[2],
                        Last = csvReader[3],
                        Email = csvReader[4],
                        Value = csvReader[5],
                        Date = Convert.ToDateTime(csvReader[6]),
                        Phone = csvReader[7],
                        Age = Convert.ToInt32(csvReader[8]),
                        State = string.IsNullOrEmpty(csvReader[9]) || string.IsNullOrWhiteSpace(csvReader[9]) ? "BLANK" : csvReader[9],
                        Street01 = csvReader[10],
                        Street02 = csvReader[11]
                    };

                    if (statistics.ContainsKey(entry.Date.Year))
                    {
                        statistics[entry.Date.Year]++;
                    }
                    else
                    {
                        statistics.Add(entry.Date.Year, 1);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred on line {line}. Ex: {ex}");
                return null;
            }

            foreach (var kvp in statistics)
            {
                var stat = new Statistic()
                {
                    Id = Guid.NewGuid(),
                    CSVFileId = csvFile.Id,
                    Year = kvp.Key,
                    Count = kvp.Value
                };

                csvFile.Statistics.Add(stat);
            }

            using var fileStream = new FileStream(csvFile.Path, FileMode.Create);
            await csvFile.File.CopyToAsync(fileStream);
            _context.CSVFiles.Add(csvFile);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}