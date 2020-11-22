using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using WEB.Models;

namespace WEB.Controllers
{
    public class ServiceController : Controller
    {
        #region Método listar serviços - READ
        //GET Service/GetService
        public JsonResult ListServices()
        {
            using (var db = new ServicesEntities())
            {
                List<Service> services = db.Services.ToList();
                return Json(services, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region Adiciona serviço - CREATE
        //POST Service/AddService
        [HttpPost]
        public JsonResult AddService(Service service)
        {
            if (service != null)
            {
                using (var db = new ServicesEntities())
                {
                    try
                    {
                        db.Services.Add(service);
                        db.SaveChanges();
                    }
                    catch (Exception exception)
                    {
                        Console.WriteLine(exception.Message);
                    }

                    return Json(new { success = true });
                }
            }
            return Json(new { success = false });
        }
        #endregion

        #region Atualizar serviço - UPDATE
        //PUT Service/UpdateService
        [HttpPost]
        public JsonResult UpdateService(Service service)
        {
            using (var db = new ServicesEntities())
            {
                var serviceUpdated = db.Services.Find(service.ServiceId);
                if (serviceUpdated == null)
                {
                    return Json(new { success = false });
                }
                else
                {
                    serviceUpdated.Description = service.Description;
                    serviceUpdated.Date = service.Date;
                    serviceUpdated.Type = service.Type;

                    db.SaveChanges();
                    return Json(new { success = true });
                }
            }
        }
        #endregion

        #region Remover serviço - DELETE
        [HttpPost]
        public JsonResult RemoveService(int id)
        {
            using (var db = new ServicesEntities())
            {
                Service service = db.Services.Find(id);
                if (service == null)
                {
                    return Json(new { success = false });
                }

                db.Services.Remove(service);
                db.SaveChanges();

                return Json(new { success = true });
            }
        }
        #endregion
    }
}