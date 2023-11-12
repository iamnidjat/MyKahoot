﻿using KahootWebApi.Models;
using Microsoft.EntityFrameworkCore;

namespace KahootWebApi.Services
{
    public class StatisticsManager : IStatisticsManager
    {
        private readonly KahootDbContext _context;

        public StatisticsManager(KahootDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<QuizStat>> DownloadResultAsync(int userId, string catType, string quizType, string level)
        {
            try
            {
                return await _context.Quizzes.Where(x => x.UserId == userId && x.QuizName == quizType && x.CategoryName == catType && x.Level == level).ToListAsync();
            }
            catch (ArgumentNullException ex)
            {
                throw new ArgumentNullException(ex.Message, ex);
            }
        }

        public async Task<IEnumerable<QuizStat>> DownloadResultAsync(string catType, string quizType, string level)
        {
            try
            {
                return await _context.Quizzes.OrderByDescending(x => x.Score).Take(10).Where(x => x.QuizName == quizType && x.CategoryName == catType && x.Level == level).ToListAsync();
            }
            catch (ArgumentNullException ex)
            {
                throw new ArgumentNullException(ex.Message, ex);
            }
        }

        //public QuizStat UploadResultAsync(QuizStat item)
        //{
        //    try
        //    {
        //        var result = _context.Quizzes.Add(item);

        //        _context.SaveChangesAsync();

        //        return result.Entity;
        //    }
        //    catch (Exception ex) when (ex is OperationCanceledException or DbUpdateException or DbUpdateConcurrencyException)
        //    {
        //        throw new Exception(ex.Message, ex);
        //    }
        //}

        public async Task UploadResultAsync(QuizStat item)
        {
            try
            {
                _context.Quizzes.Add(item);

                await _context.SaveChangesAsync();
            }
            catch (Exception ex) when (ex is OperationCanceledException or DbUpdateException or DbUpdateConcurrencyException)
            {
                throw new Exception(ex.Message, ex);
            }
        }
    }
}
