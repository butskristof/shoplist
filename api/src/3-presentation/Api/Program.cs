using Shoplists.Api;
using Shoplists.Api.Modules;
using Shoplists.Application;
using Shoplists.Application.Common.Constants;
using Shoplists.Infrastructure;
using Shoplists.Persistence;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddConfiguration()
    .AddApplication()
    .AddInfrastructure()
    .AddPersistence(
        builder.Configuration.GetConnectionString(ConfigurationConstants.AppDbContextConnectionStringKey)
    )
    .AddApi();

var app = builder.Build();

app
    // the default exception handler will catch unhandled exceptions and return 
    // them as ProblemDetails with status code 500 Internal Server Error
    .UseExceptionHandler()
    // the status code pages will map additional failed requests (outside of
    // those throwing exceptions) to responses with ProblemDetails body content
    // this includes 404, method not allowed, ... (all status codes between 400 and 599)
    // keep in mind that this middleware will only activate if the body is empty when
    // it reaches it
    .UseStatusCodePages();

app.UseAuthorization();

app.MapHealthChecks("/health");
app
    .MapSwagger()
    .RequireAuthorization();
app
    .MapListsEndpoints()
    .MapListItemsEndpoints();

app.Run();