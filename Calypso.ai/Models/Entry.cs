using System;
using System.ComponentModel.DataAnnotations;

namespace Calypso.ai.Models
{
    public class Entry
    {
        public Entry()
        {
        }

        [Required]
        public Guid Id { get; set; }

        [Required]
        public Guid CSVFileId { get; set; }

        public string Guid { get; set; }

        public string Name { get; set; }

        public string First { get; set; }

        public string Last { get; set; }

        public string Email { get; set; }

        public string Value { get; set; }

        [DataType(DataType.Date), Required]
        public DateTime Date { get; set; }

        public string Phone { get; set; }

        public int Age { get; set; }

        [Required]
        public string State { get; set; } = "BLANK";

        public string Street01 { get; set; }

        public string Street02 { get; set; }
    }
}
