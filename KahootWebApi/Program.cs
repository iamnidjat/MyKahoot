using KahootWebApi.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
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
builder.Services.AddTransient<IPhotoService, PhotoService>();
builder.Services.AddTransient<IAdminManager, AdminManager>();

builder.Services.AddDbContext<KahootDbContext>(options => {
    var connectionString = builder.Configuration.GetConnectionString("MyKahootDb");

    options.UseSqlServer(connectionString);
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

app.UseHttpsRedirection();

app.UseCors(options =>
{
    options.AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader();
});

app.UseStaticFiles();
app.UseStaticFiles(new StaticFileOptions()
{
    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"Resources")),
    RequestPath = new PathString("/Resources")
});

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
