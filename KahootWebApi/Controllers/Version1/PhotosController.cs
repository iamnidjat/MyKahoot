using KahootWebApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;

namespace KahootWebApi.Controllers.Version1
{
    [Route("api/v1/Photos/")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IPhotoService _manager;

        public PhotosController(IPhotoService manager)
        {
            _manager = manager;
        }

        [HttpPost("Upload"), DisableRequestSizeLimit]
        public async Task<IActionResult> Upload(int userId)
        {
            try
            {
                var formCollection = await Request.ReadFormAsync();
                var file = formCollection.Files.First();
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);

                    await _manager.SavePhoto(userId, dbPath);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    //return Ok(new { dbPath });
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

        [HttpGet("GetPhotoURL")]
        public async Task<string> GetPhotoURL(int userId)
        {
            return await _manager.GetPhotoUrl(userId);
        }
    }
}
