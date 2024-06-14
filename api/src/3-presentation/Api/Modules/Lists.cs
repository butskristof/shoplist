using Shoplists.Api.Extensions;

namespace Shoplists.Api.Modules;

internal static class Lists
{
    private const string GroupName = "Lists";

    internal static void MapListsEndpoints(this IEndpointRouteBuilder endpoints)
    {
        var group = endpoints
            .MapGroup($"/{GroupName}")
            .WithTags(GroupName);
        // .RequireAuthorization();

        group
            .MapPost("", CreateList)
            .WithName(nameof(CreateList))
            .ProducesNoContent();
    }

    private static Task<IResult> CreateList() => Task.FromResult(Results.NoContent());
}