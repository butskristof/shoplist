using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Shoplists.Application.Common.Persistence;

namespace Shoplists.Application.Modules.Lists;

public static class DeleteList
{
    public sealed record Command(Guid Id) : IRequest<ErrorOr<Deleted>>;

    internal sealed class Handler : IRequestHandler<Command, ErrorOr<Deleted>>
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

        public async Task<ErrorOr<Deleted>> Handle(Command command, CancellationToken cancellationToken)
        {
            _logger.LogDebug("Deleting a List");

            var list = await _dbContext
                .CurrentUserLists(true)
                .SingleOrDefaultAsync(l => l.Id == command.Id, cancellationToken: cancellationToken);
            if (list is null)
            {
                _logger.LogDebug(
                    "Failed to fetch list with ID {Id} from database: does not exist or does not belong to this user",
                    command.Id);
                return Error.NotFound(nameof(command.Id), $"Could not find List with id {command.Id}");
            }

            _logger.LogDebug("Fetched entity to delete from database");

            _dbContext.Lists.Remove(list);
            await _dbContext.SaveChangesAsync(CancellationToken.None);
            _logger.LogDebug("Removed entity from database");

            return Result.Deleted;
        }
    }
}