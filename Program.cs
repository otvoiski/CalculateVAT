using CalculateVAT.Data;
using CalculateVAT.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;

var cors = "_defaultOrigins";

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<IVatContext, VatContext>(x => x.UseInMemoryDatabase("InMemoryDb"));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: cors,
        policy =>
        {
            policy.WithOrigins("http://localhost:3000");
        });
});
builder.Services.AddScoped<IVatRepository, VatRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(cors);

app.UseAuthorization();

app.MapControllers();

var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetService<IVatContext>();
DataBaseItems.AddVatData(context);

app.Run();


