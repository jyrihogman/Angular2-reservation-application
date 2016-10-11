using System.Collections.Generic;

namespace ErDbBackend.Models
{
    public class ReservationContainerDTO
    {
        public string Date { get; set; }
        public IEnumerable<ReservationDTO> Reservations { get; set; }
    }
}