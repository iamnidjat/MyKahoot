using Microsoft.AspNetCore.Mvc;
using KahootWebApi.Services;
using KahootWebApi.Models;

namespace KahootWebApi.Controllers.Version1
{
    [Route("api/v1/DownloadQuiz/")]
    [ApiController]
    public class DownloadQuizController : ControllerBase
    {
        private readonly IDownloadQuizService _downloadQuizService;

        public DownloadQuizController(IDownloadQuizService downloadQuizService)
        {
            _downloadQuizService = downloadQuizService;
        }

        [HttpPost("downloadAsTxt")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult DownloadTxt([FromBody] QuizDownloadRequest request)
        {
            byte[] fileBytes = _downloadQuizService.GenerateFileContentTxt(request.QuizContent);
            return File(fileBytes, "text/plain", $"{request.FileName}.txt");
        }

        [HttpPost("downloadAsDocx")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult DownloadDocx([FromBody] QuizDownloadRequest request)
        {
            byte[] fileBytes = _downloadQuizService.GenerateFileContentDocx(request.QuizContent, request.FileName);
            return File(fileBytes, "application/vnd.openxmlformats-officedocument.wordprocessingml.document", $"{request.FileName}.docx");
        }

        [HttpPost("downloadAsJson")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult DownloadQuiz([FromBody] QuizDownloadRequest request)
        {
            byte[] fileBytes = _downloadQuizService.GenerateFileContentJson(request.QuizContent);
            return File(fileBytes, "application/json", $"{request.FileName}.json");
        }
    }
}

