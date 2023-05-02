using Microsoft.EntityFrameworkCore;
using Ticket_Booking_App.Data;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();
// Add services to the container.
builder.Services.AddInfrastructure();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//builder.Services.AddDbContext<TicketDbContext>(options =>
//options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "AllowOrigin",
        builder =>
        {
            builder.WithOrigins("https://localhost:44351", "http://localhost:4200")
                                .AllowAnyHeader()
                                .AllowAnyMethod();
        });
});
var app = builder.Build();
//db


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseRouting();
app.UseCors();
app.UseCors("AllowOrigin");
app.UseAuthentication();
app.UseAuthorization();
app.UseHttpsRedirection();
app.MapControllers();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.Run();
