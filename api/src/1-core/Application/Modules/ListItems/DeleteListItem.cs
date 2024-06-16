using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Shoplists.Application.Common.Persistence;

namespace Shoplists.Application.Modules.ListItems;

public static class DeleteListItem
{
    public sealed record Command(Guid ListId, Guid ItemId) : IRequest<ErrorOr<Deleted>>;

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
            _logger.LogDebug("Deleting a ListItem");

            var list = await _dbContext
                .CurrentUserLists(true)
                .Include(l => l.Items)
                .SingleOrDefaultAsync(l => l.Id == command.ListId, cancellationToken: cancellationToken);
            if (list is null)
            {
                _logger.LogDebug(
                    "Failed to fetch list with ID {ListId} from database: does not exist or does not belong to this user",
                    command.ListId);
                return Error.NotFound(nameof(command.ListId), $"Could not find List with id {command.ListId}");
            }

            _logger.LogDebug("Fetched list and list items from database");

            var listItem = list.Items.SingleOrDefault(i => i.Id == command.ItemId);
            if (listItem is null)
            {
                _logger
                    .LogDebug(
                        "Failed to retrieve ListItem with ID {ListItemId}: does not exist in this List",
                        command.ItemId);
                return Error.NotFound(nameof(command.ItemId), $"Could not find ListItem with id {command.ItemId}");
            }

            _logger.LogDebug("Retrieved list item to delete from entity");

            list.Items.Remove(listItem);
            _logger.LogDebug("Removed entity from aggregate");

            await _dbContext.SaveChangesAsync(CancellationToken.None);

            return Result.Deleted;
        }
    }
}