namespace Shoplists.Api;

internal static class DependencyInjection
{
    #region Configuration

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
            .AddHealthChecks();

        return services;
    }

    #endregion
}