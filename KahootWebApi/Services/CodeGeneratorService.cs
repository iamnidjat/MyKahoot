using System.Text;

namespace KahootWebApi.Services
{
    public class CodeGeneratorService
    {
        private const string CharSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        public static string GenerateCode(int length)
        {
            Random random = new ();
            StringBuilder codeBuilder = new ();

            for (int i = 0; i < length; i++)
            {
                int index = random.Next(CharSet.Length);
                codeBuilder.Append(CharSet[index]);
            }

            return codeBuilder.ToString();
        }
    }
}
