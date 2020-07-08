using System;
using System.ComponentModel.DataAnnotations;

namespace Calypso.ai.Models
{
    public class Header
    {
        public Header()
        {
        }

        [Required]
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
