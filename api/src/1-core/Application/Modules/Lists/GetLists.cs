using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Shoplists.Application.Common.Persistence;

namespace Shoplists.Application.Modules.Lists;

public static class GetLists
{
    public sealed record Request : IRequest<ErrorOr<Response>>;

    public sealed record Response
    {
        public IEnumerable<List> Lists { get; }

        public Response(IEnumerable<List> lists)
        {
            Lists = lists;
        }

        public sealed record List(Guid Id, string Name, int ItemsCount);
    }

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
            _logger.LogDebug("Fetching Lists for current user");

            var lists = await _dbContext
                .CurrentUserLists(false)
                .Select(l => new Response.List(l.Id, l.Name, l.Items.Count))
                .ToListAsync(cancellationToken: cancellationToken);
            _logger.LogDebug("Fetched mapped lists from database");

            return new Response(lists);
        }
    }
}