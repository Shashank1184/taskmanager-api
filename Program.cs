var builder = WebApplication.CreateBuilder(args);

// ✅ Add services
builder.Services.AddControllers();   // ⭐ IMPORTANT

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ✅ Add CORS BEFORE builder.Build()
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

var app = builder.Build();

// ✅ Middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();  // keep commented

app.UseCors("AllowAll");   // ⭐ AFTER builder.Build()

app.UseAuthorization();

app.MapControllers();      // ⭐ VERY IMPORTANT

app.Run();