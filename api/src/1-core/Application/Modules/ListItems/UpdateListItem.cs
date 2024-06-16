using ErrorOr;
using MediatR;

namespace Shoplists.Application.Modules.ListItems;

public static class UpdateListItem
{
    public sealed record Request : IRequest<ErrorOr<Updated>>;
}