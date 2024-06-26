﻿using Microsoft.AspNetCore.Mvc;
using System.Text;
using Xceed.Words.NET;
using System.IO;
using System.Text.Json;
using Newtonsoft.Json;
using JsonSerializer = System.Text.Json.JsonSerializer;
using Newtonsoft.Json.Linq;
using KahootWebApi.Models;
using KahootWebApi.Services.Interfaces;

namespace KahootWebApi.Services.Implementations
{
    public class DownloadQuizService : IDownloadQuizService
    {
        private readonly ILogger<DownloadQuizService> _logger;

        public DownloadQuizService(ILogger<DownloadQuizService> logger)
        {
            _logger = logger;
        }

        public byte[] GenerateFileContentTxt(string quizContent)
        {
            try
            {
                return Encoding.UTF8.GetBytes(quizContent);
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the GenerateFileContentTxt method.");
                return Array.Empty<byte>();
            }
        }

        public byte[] GenerateFileContentDocx(string quizContent, string fileName)
        {
            try
            {
                using (var doc = DocX.Create($"{fileName}.docx"))
                {
                    doc.InsertParagraph(quizContent);

                    MemoryStream memoryStream = new MemoryStream();
                    doc.SaveAs(memoryStream);

                    return memoryStream.ToArray();
                }
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the GenerateFileContentDocx method.");
                return Array.Empty<byte>();
            }
        }

        public byte[] GenerateFileContentJson(string quizContent)
        {
            try
            {
                return Encoding.UTF8.GetBytes(quizContent);
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the GenerateFileContentJson method.");
                return Array.Empty<byte>();
            }
        }
    }
}
