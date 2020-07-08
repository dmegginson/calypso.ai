using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace Calypso.ai.Models
{
    public class CSVFile
    {
        public CSVFile()
        {
        }

        //[Required]
        public Guid Id { get; set; }

        //[Required]
        public string FileName { get; set; }

        //[Required]
        public string Path { get; set; }

        //[Required]
        public bool HasHeaders { get; set; }

        [DataType(DataType.Date)]
        public DateTime LastDownloaded { get; set; }

        [DataType(DataType.Date)]
        public DateTime LastContentViewed { get; set; }

        [NotMapped]
        public IFormFile File { get; set; }

        public List<Statistic> Statistics { get; set; }

        public List<Entry> Entries { get; set; }

        public List<Header> Headers { get; set; }
    }
}
