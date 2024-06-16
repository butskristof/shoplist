using ErrorOr;
using MediatR;

namespace Shoplists.Application.Modules.ListItems;

public static class DeleteListItem
{
    public sealed record Request(Guid ListId, Guid ItemId) : IRequest<ErrorOr<Deleted>>;
}