var builder = WebApplication.CreateBuilder(args);

//Allow CORS for react frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173").AllowAnyHeader().AllowAnyMethod();
        });

});

// Add services to the container.

builder.Services.AddControllers();

var app = builder.Build();
//Enable CORS

app.UseCors("AllowReactFrontend");

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
