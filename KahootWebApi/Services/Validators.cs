using System;
using System.Text.RegularExpressions;

namespace KahootWebApi.Services
{
    public class Validators
    {
        //private string phoneValidatorApi = $"https://phonevalidation.abstractapi.com/v1/?api_key=968f4e2430d74de9bf51cbdd66299eb5&phone={phoneNumber}";
        //private bool result;

        public static bool IsEmailValid(string email)
        {
            if (email != "")
            {
                string regex = @"^[^@\s]+@[^@\s]+\.(com|net|org|gov|ru)$";

                return Regex.IsMatch(email, regex, RegexOptions.IgnoreCase);
            }

            return false;
        }

        //public async Task<bool> IsPhoneNumberValid(string number)
        //{
        //    if (number != "")
        //    {
        //        var client = new HttpClient();
        //        HttpResponseMessage response = await client.GetAsync(phoneValidatorApi);
        //        response.EnsureSuccessStatusCode();
        //        result = await response.Content.ReadAsStringAsync();
        //    }

        //    return false;
        //}
    }
}
