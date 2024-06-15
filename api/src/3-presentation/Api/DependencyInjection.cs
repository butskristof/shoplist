using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Shoplists.Api.Common;
using Shoplists.Application.Common.Authentication;
using Shoplists.Application.Common.Configuration;
using Shoplists.Application.Common.Constants;

namespace Shoplists.Api;

internal static class DependencyInjection
{
    #region Configuration

    internal static IServiceCollection AddConfiguration(this IServiceCollection services)
    {
        services
            .AddValidatedSettings<AuthenticationSettings>(ConfigurationConstants.Authentication);

        return services;
    }

    private static IServiceCollection AddValidatedSettings<TOptions>(this IServiceCollection services,
        string sectionName)
        where TOptions : class
    {
        services
            .AddOptions<TOptions>()
            .BindConfiguration(sectionName);
        // .FluentValidateOptions()
        // .ValidateOnStart();

        return services;
    }

    #endregion

    #region Api

    internal static IServiceCollection AddApi(this IServiceCollection services)
    {
        services
            .AddEndpointsApiExplorer()
            .AddSwaggerGen(options =>
            {
                // by default, Swagger will try to use the type name as schema ID 
                // since we're using static classes with inner Request, Response, ... types
                // these would be flagged as conflicting definitions
                options.CustomSchemaIds(type => type.FullName?.Replace('+', '.'));
            });

        // add support for ProblemDetails to handle failed requests
        // it's effectively a default implementation of the IProblemDetailsService and can be
        // overridden if desired
        // it adds a default problem details response for all client and server error responses (400-599)
        // that don't have body content yet
        services.AddProblemDetails();

        services
            .AddHttpContextAccessor()
            .AddScoped<IAuthenticationInfo, ApiAuthenticationInfo>();

        services
            .AddAuthentication()
            .AddJwtBearer(options =>
            {
                using var serviceProvider = services.BuildServiceProvider();
                var configuration = serviceProvider
                    .GetRequiredService<IOptions<AuthenticationSettings>>()
                    .Value;

                options.Authority = configuration.Issuer;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateAudience = true,
                    ValidAudiences = configuration.Audiences,
                    ValidateIssuer = true,
                    ValidIssuer = configuration.Issuer,
                    ValidateIssuerSigningKey = true,
                    RequireSignedTokens = true,
                    RequireExpirationTime = true,
                    ValidateLifetime = true,
                };
            });
        services.AddAuthorization();

        services
            .AddHealthChecks();

        return services;
    }

    #endregion
}