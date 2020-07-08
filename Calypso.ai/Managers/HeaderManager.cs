using System;
using System.Collections.Generic;
using Calypso.ai.Models;
using Microsoft.EntityFrameworkCore;

namespace Calypso.ai.Managers
{
    public class HeaderManager
    {
        private HeaderContext _context;
        private List<Header> _headers = null;

        public HeaderManager(HeaderContext context)
        {
            _context = context;
        }

        public List<Header> Headers
        {
            get
            {
                if (_headers == null)
                {
                    _headers = _context.Headers.ToListAsync().Result;
                }

                return _headers;
            }
        }

    }
}
