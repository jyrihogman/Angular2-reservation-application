namespace ErDbBackend.Models
{
    public class ReservationDTO
    {
        public int Id { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public bool Reserved { get; set; }
    }
}