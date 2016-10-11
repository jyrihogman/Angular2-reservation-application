using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using ErDbBackend.Models;
using System.Web.Http.Cors;

namespace ErDbBackend.Controllers
{
    [RoutePrefix("api/Reservations")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ReservationsController : ApiController
    {
        // GET: api/Reservations
        [Route("")]
        [HttpGet]
        public async Task<IEnumerable<ReservationContainerDTO>> GetAllReservations() 
        {
            using (var db = new CalendarProjectEntities())
            {
                var c = await (from reservation in db.RESERVATIONs where reservation.RESERVED == false
                               group reservation by reservation.DATE into reservationGroup
                               select reservationGroup).ToListAsync();

                return c.Select(group => new ReservationContainerDTO {
                    Date = group.Key,
                    Reservations = group.Select(r => new ReservationDTO {
                        Date = r.DATE,
                        Email = r.EMAIL,
                        Phone = r.PHONE,
                        Firstname = r.FIRSTNAME,
                        Lastname = r.LASTNAME,
                        Reserved = r.RESERVED,
                        Time = r.TIME,
                        Id = r.ID })
                });
            }
        }


        // PUT: api/Reservations/5
        [Route("{id:int}")]
        [HttpPut]
        public async Task<IHttpActionResult> SaveReservation(int id, ReservationDTO r)
        {
            using (var db = new CalendarProjectEntities())
            {
                if (id != r.Id)
                {
                    return BadRequest();
                }

                RESERVATION reservation = db.RESERVATIONs.FirstOrDefault(i => i.ID == id);

                if (reservation.RESERVED)
                    return BadRequest();
 
                reservation.EMAIL = r.Email;
                reservation.PHONE = r.Phone;
                reservation.FIRSTNAME = r.Firstname;
                reservation.LASTNAME = r.Lastname;
                reservation.RESERVED = r.Reserved;

                db.Entry(reservation).State = EntityState.Modified;

                try
                {
                    await db.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (db.RESERVATIONs.Count(e => e.ID == id) > 0)
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return StatusCode(HttpStatusCode.NoContent);

                }
        }
    }
}