using KahootWebApi.Services;
using KahootWebApi.Services.Implementations;
using KahootWebApi.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using reCAPTCHA.AspNetCore;
using reCAPTCHA.AspNetCore.Versions;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors(); // !
builder.Services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles); // !

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddTransient<IAccountManager, AccountManager>();
builder.Services.AddTransient<IStatisticsManager, StatisticsManager>();
builder.Services.AddTransient<IQuizManager, QuizManager>();
builder.Services.AddTransient<IContactManager, ContactManager>();
builder.Services.AddTransient<IBarChartStatsManager, BarChartStatsManager>();
builder.Services.AddTransient<ICredentialsChangingManager, CredentialsChangingManager>();
builder.Services.AddTransient<IMailConfirmationManager, MailConfirmationManager>();
builder.Services.AddTransient<IUserInfoManager, UserInfoManager>();
builder.Services.AddTransient<INewsLetter, NewsLetter>();
builder.Services.AddTransient<IAdminManager, AdminManager>();
builder.Services.AddTransient<ICaptchaVerificationService, CaptchaVerificationService>();
builder.Services.AddTransient<IDownloadQuizService, DownloadQuizService>();
builder.Services.AddTransient<IInteractionService, InteractionService>();
builder.Services.AddTransient<IFeedbackService, FeedbackService>();
builder.Services.AddTransient<IMessageService, MessageService>();

builder.Services.AddDbContext<KahootDbContext>(options => {
    var connectionString = builder.Configuration.GetConnectionString("MyKahootDb");

    options.UseSqlServer(connectionString);
});

var recaptchaSettings = builder.Configuration.GetSection("RecaptchaSettings");
builder.Services.Configure<RecaptchaSettings>(recaptchaSettings);

builder.Services.AddRecaptcha(options =>
{
    options.SiteKey = recaptchaSettings["SiteKey"];
    options.SecretKey = recaptchaSettings["SecretKey"];
});

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options => //CookieAuthenticationOptions
    {
        options.LoginPath = new PathString("/Account/Login");
        options.LogoutPath = new PathString("/Account/Logout");
    });

builder.Services.Configure<FormOptions>(o =>
{
    o.ValueLengthLimit = int.MaxValue;
    o.MultipartBodyLengthLimit = int.MaxValue;
    o.MemoryBufferThreshold = int.MaxValue;
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Configure static file serving for the "uploads" directory
var uploadsPath = Path.Combine(Directory.GetCurrentDirectory(), "uploads");
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(uploadsPath),
    RequestPath = "/uploads"
});


app.UseHttpsRedirection();

app.UseCors(options =>
{
    options.AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader();
});

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
