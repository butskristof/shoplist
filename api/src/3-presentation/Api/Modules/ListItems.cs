using MediatR;
using Microsoft.AspNetCore.Mvc;
using Shoplists.Api.Extensions;
using Shoplists.Application.Modules.ListItems;

namespace Shoplists.Api.Modules;

internal static class ListItems
{
    internal const string GroupName = "Items";

    internal static IEndpointRouteBuilder MapListItemsEndpoints(this IEndpointRouteBuilder endpoints)
    {
        var group = endpoints
            .MapGroup("")
            .WithTags("ListItems")
            .RequireAuthorization();

        group
            .MapPost($"/{Lists.GroupName}/{{listId:guid}}/{GroupName}", CreateListItem)
            .WithName(nameof(CreateListItem))
            .ProducesCreated<CreateListItem.Response>()
            .ProducesNotFound()
            .ProducesValidationProblem();

        group
            .MapPut($"/{Lists.GroupName}/{{listId:guid}}/{GroupName}/{{itemId:guid}}", UpdateListItem)
            .WithName(nameof(UpdateListItem))
            .ProducesNoContent()
            .ProducesNotFound()
            .ProducesValidationProblem();

        group
            .MapDelete($"/{Lists.GroupName}/{{listId:guid}}/{GroupName}/{{itemId:guid}}", DeleteListItem)
            .WithName(nameof(DeleteListItem))
            .ProducesNoContent()
            .ProducesNotFound();

        return endpoints;
    }

    private static Task<IResult> CreateListItem(
        [FromRoute] Guid listId,
        [FromBody] CreateListItem.Request request,
        [FromServices] ISender sender
    )
        => sender.Send(new CreateListItem.Command(listId, request.Name))
            .MapToCreatedOrProblem(response => $"/{Lists.GroupName}/{response.ListId}");

    private static Task<IResult> UpdateListItem(
        [FromRoute] Guid listId,
        [FromRoute] Guid itemId,
        [FromBody] UpdateListItem.Request request,
        [FromServices] ISender sender
    )
        => sender.Send(new UpdateListItem.Command(itemId, listId, request))
            .MapToNoContentOrProblem();

    private static Task<IResult> DeleteListItem(
        [FromRoute] Guid listId,
        [FromRoute] Guid itemId,
        [FromServices] ISender sender
    )
        => sender.Send(new DeleteListItem.Command(listId, itemId))
            .MapToNoContentOrProblem();
}