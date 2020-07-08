using System;
using System.ComponentModel.DataAnnotations;

namespace Calypso.ai.Models
{
    public class Statistic
    {
        public Statistic()
        {
        }

        [Required]
        public Guid Id { get; set; }

        [Required]
        public Guid CSVFileId { get; set; }

        [Required]
        public CSVFile CSVFile { get; set; }

        [Required]
        public int Year { get; set; }

        [Required]
        public long Count { get; set; }
    }
}
