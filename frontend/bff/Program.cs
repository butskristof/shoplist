using Duende.Bff;
using Microsoft.Extensions.Options;
using Shoplists.Bff;
using Shoplists.Bff.Configuration;

var builder = WebApplication.CreateBuilder(args);
var isProduction = builder.Environment.IsProduction();

builder.Services
    .AddConfiguration()
    .AddShoplistsBff();

var app = builder.Build();

app.UseForwardedHeaders();
if (isProduction) // serve SPA assets from wwwroot
{
    app.UseDefaultFiles();
    app.UseStaticFiles();
}

app.UseRouting();

app.UseAuthentication();
app.UseBff();
app.UseAuthorization();

app.MapHealthChecks("/health");
app.MapBffManagementEndpoints();
var remoteApiSettings = app.Services
    .GetRequiredService<IOptions<RemoteApiSettings>>()
    .Value;
app.MapRemoteBffApiEndpoint("/api", remoteApiSettings.ShoplistsApiUrl)
    .RequireAccessToken(TokenType.User);

// serve index for everything that's not either a static asset or a configured route (bff, api proxy, ...)
if (isProduction)
    app.MapFallbackToFile("index.html");

app.Run();