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
            .MapPost($"/{Lists.GroupName}/{{ListId:guid}}/{GroupName}", CreateListItem)
            .WithName(nameof(CreateListItem))
            .ProducesCreated<CreateListItem.Response>()
            .ProducesNotFound()
            .ProducesValidationProblem();

        group
            .MapPut($"/{Lists.GroupName}/{{ListId:guid}}/{GroupName}/{{ItemId:guid}}", UpdateListItem)
            .WithName(nameof(UpdateListItem))
            .ProducesNoContent()
            .ProducesNotFound()
            .ProducesValidationProblem();

        group
            .MapDelete($"/{Lists.GroupName}/{{ListId:guid}}/{GroupName}/{{ItemId:guid}}", DeleteListItem)
            .WithName(nameof(DeleteListItem))
            .ProducesNoContent()
            .ProducesNotFound();

        return endpoints;
    }

    private static Task<IResult> CreateListItem(
        [FromRoute] Guid ListId,
        [FromBody] CreateListItem.Request request,
        [FromServices] ISender sender
    )
        => sender.Send(new CreateListItem.Command(ListId, request.Name))
            .MapToCreatedOrProblem(response => $"/{Lists.GroupName}/{response.ListId}");

    private static Task<IResult> UpdateListItem(
        [FromRoute] Guid ListId,
        [FromRoute] Guid ItemId,
        [FromBody] UpdateListItem.Request request,
        [FromServices] ISender sender
    )
        => sender.Send(new UpdateListItem.Command(ItemId, ListId, request))
            .MapToNoContentOrProblem();

    private static Task<IResult> DeleteListItem(
        [FromRoute] Guid ListId,
        [FromRoute] Guid ItemId,
        [FromServices] ISender sender
    )
        => sender.Send(new DeleteListItem.Command(ListId, ItemId))
            .MapToNoContentOrProblem();
}