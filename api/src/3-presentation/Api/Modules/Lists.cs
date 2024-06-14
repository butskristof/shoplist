using MediatR;
using Microsoft.AspNetCore.Mvc;
using Shoplists.Api.Extensions;
using Shoplists.Application.Modules.Lists;

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
            .ProducesCreated<CreateList.Response>()
            .ProducesValidationProblem();
    }

    private static async Task<IResult> CreateList([FromBody] CreateList.Request request, ISender sender)
    {
        var result = await sender.Send(request);
        return result.MapToValueOrProblem(response => TypedResults.Created($"/{GroupName}/{response.Id}", response));
    }
}