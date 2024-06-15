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
    }

    private static Task<IResult> GetLists([FromServices] ISender sender)
        => sender.Send(new GetLists.Request())
            .MapToOkOrProblem();

    private static Task<IResult> GetList([FromRoute] Guid id, [FromServices] ISender sender)
        => sender.Send(new GetList.Request(id))
            .MapToOkOrProblem();

    private static Task<IResult> CreateList([FromBody] CreateList.Request request, ISender sender)
        => sender.Send(request)
            .MapToCreatedOrProblem(response => $"/{GroupName}/{response.Id}");

    private static Task<IResult> UpdateList([FromRoute] Guid id, [FromBody] UpdateList.Request request, ISender sender)
        => sender.Send(request)
            .MapToNoContentOrProblem();

    private static Task<IResult> DeleteList([FromRoute] Guid id, ISender sender)
        => sender.Send(new DeleteList.Request(id))
            .MapToNoContentOrProblem();
}