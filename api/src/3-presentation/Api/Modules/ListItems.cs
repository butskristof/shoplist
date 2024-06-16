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
            .MapGroup($"/{Lists.GroupName}/{{ListId:guid}}/{GroupName}")
            .WithTags("ListItems")
            .RequireAuthorization();

        group
            .MapPost("", CreateListItem)
            .WithName(nameof(CreateListItem))
            .ProducesCreated<CreateListItem.Response>()
            .ProducesNotFound()
            .ProducesValidationProblem();

        group
            .MapPut("{ItemId:guid}", UpdateListItem)
            .WithName(nameof(UpdateListItem))
            .ProducesNoContent()
            .ProducesNotFound()
            .ProducesValidationProblem();

        group
            .MapDelete("{ItemId:guid}", DeleteListItem)
            .WithName(nameof(DeleteListItem))
            .ProducesNoContent()
            .ProducesNotFound();

        return endpoints;
    }

    private static Task<IResult> CreateListItem([FromBody] CreateListItem.Request request, ISender sender)
        => sender.Send(request)
            .MapToCreatedOrProblem(response => $"/{Lists.GroupName}/{response.ListId}");

    private static Task<IResult> UpdateListItem([FromBody] UpdateListItem.Request request, ISender sender)
        => sender.Send(request)
            .MapToNoContentOrProblem();

    private static Task<IResult> DeleteListItem([AsParameters] DeleteListItem.Request request, ISender sender)
        => sender.Send(request)
            .MapToNoContentOrProblem();
}