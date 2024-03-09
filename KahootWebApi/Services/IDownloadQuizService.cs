﻿namespace KahootWebApi.Services
{
    public interface IDownloadQuizService
    {
        public byte[] GenerateFileContentTxt(string quizContent);
        public byte[] GenerateFileContentDocx(string quizContent, string fileName);
        public byte[] GenerateFileContentJson(string quizContent);
    }
}
