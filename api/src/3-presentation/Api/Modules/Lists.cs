using MediatR;
using Microsoft.AspNetCore.Mvc;
using Shoplists.Api.Extensions;
using Shoplists.Application.Modules.Lists;

namespace Shoplists.Api.Modules;

internal static class Lists
{
    internal const string GroupName = "Lists";

    internal static IEndpointRouteBuilder MapListsEndpoints(this IEndpointRouteBuilder endpoints)
    {
        var group = endpoints
            .MapGroup($"/{GroupName}")
            .WithTags(GroupName)
            .RequireAuthorization();

        group
            .MapGet("", GetLists)
            .WithName(nameof(GetLists))
            .ProducesOk<GetLists.Response>();

        group
            .MapGet("{id:guid}", GetList)
            .WithName(nameof(GetList))
            .ProducesOk<GetList.Response>()
            .ProducesNotFound();

        group
            .MapPost("", CreateList)
            .WithName(nameof(CreateList))
            .ProducesCreated<CreateList.Response>()
            .ProducesValidationProblem();

        group
            .MapPut("{id:guid}", UpdateList)
            .WithName(nameof(UpdateList))
            .ProducesNoContent()
            .ProducesNotFound()
            .ProducesValidationProblem();

        group
            .MapDelete("{id:guid}", DeleteList)
            .WithName(nameof(DeleteList))
            .ProducesNoContent()
            .ProducesNotFound();

        return endpoints;
    }

    private static Task<IResult> GetLists(
        [FromServices] ISender sender
    )
        => sender.Send(new GetLists.Query())
            .MapToOkOrProblem();

    private static Task<IResult> GetList(
        [FromRoute] Guid id,
        [FromServices] ISender sender
    )
        => sender.Send(new GetList.Query(id))
            .MapToOkOrProblem();

    private static Task<IResult> CreateList(
        [FromBody] CreateList.Request request,
        [FromServices] ISender sender
    )
        => sender.Send(new CreateList.Command(request))
            .MapToCreatedOrProblem(response => $"/{GroupName}/{response.Id}");

    private static Task<IResult> UpdateList(
        [FromRoute] Guid id,
        [FromBody] UpdateList.Request request,
        [FromServices] ISender sender
    )
        => sender.Send(new UpdateList.Command(id, request))
            .MapToNoContentOrProblem();

    private static Task<IResult> DeleteList(
        [FromRoute] Guid id,
        [FromServices] ISender sender
    )
        => sender.Send(new DeleteList.Command(id))
            .MapToNoContentOrProblem();
}