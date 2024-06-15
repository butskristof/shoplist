using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Shoplists.Application.Common.Persistence;

namespace Shoplists.Application.Modules.Lists;

public static class GetList
{
    public sealed record Request(Guid Id) : IRequest<ErrorOr<Response>>;

    public sealed record Response(
        Guid Id,
        string Name,
        IEnumerable<ListItem> Items
    );

    public sealed record ListItem(
        Guid Id,
        string Name,
        bool Ticked
    );

    internal sealed class Handler : IRequestHandler<Request, ErrorOr<Response>>
    {
        #region construction

        private readonly ILogger<Handler> _logger;
        private readonly IAppDbContext _dbContext;

        public Handler(ILogger<Handler> logger, IAppDbContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }

        #endregion

        public async Task<ErrorOr<Response>> Handle(Request request, CancellationToken cancellationToken)
        {
            _logger.LogDebug("Fetching a List");

            var list = await _dbContext
                .CurrentUserLists(false)
                .Include(l => l.Items)
                .SingleOrDefaultAsync(l => l.Id == request.Id, cancellationToken: cancellationToken);
            if (list is null)
            {
                _logger.LogDebug(
                    "Failed to fetch list with ID {Id} from database: does not exist or does not belong to this user",
                    request.Id);
                return Error.NotFound(nameof(request.Id), $"Could not find List with id {request.Id}");
            }

            _logger.LogDebug("Fetched entity from database");

            var dto = new Response(
                list.Id,
                list.Name,
                list.Items
                    .Select(i => new ListItem(
                        i.Id,
                        i.Name,
                        i.Ticked
                    ))
            );
            _logger.LogDebug("Mapped entity to response DTO");

            return dto;
        }
    }
}