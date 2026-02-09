var builder = WebApplication.CreateBuilder(args);

// Services
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddSingleton<IWordProvider, WordleWordFileProvider>();

var app = builder.Build();

// Middleware
app.UseCors("AllowReact");

// Midlertidigt kommenteret for HTTP-test
// app.UseHttpsRedirection();

// Controller endpoints
app.MapControllers();

// OpenAPI kun i dev
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.Run();