using ErrorOr;
using MediatR;

namespace Shoplists.Application.Modules.ListItems;

public static class CreateListItem
{
    public sealed record Request : IRequest<ErrorOr<Response>>;

    public sealed record Response(Guid Id, string Name, bool Ticked, Guid ListId);
}