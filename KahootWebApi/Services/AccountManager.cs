﻿namespace KahootWebApi.Services
{
    public class AccountManager : IAccountManager
    {

        public string RandomPasswordGenerator(int length)
        {
            try
            {
                byte[] result = new byte[length];

                for (int index = 0; index < length; index++)
                {
                    result[index] = (byte)new Random().Next(33, 126);
                }

                return System.Text.Encoding.ASCII.GetString(result);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public void ResetPassword(string email)
        {

        }

        public void ChangePassword(string oldPassword, string newPassword)
        {

        }

        public void ChangeBirthday(DateTime oldBirthday, DateTime newBirthday)
        {

        }
    }
}
