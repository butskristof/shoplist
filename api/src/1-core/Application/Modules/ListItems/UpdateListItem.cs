using ErrorOr;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Shoplists.Application.Common.FluentValidation;
using Shoplists.Application.Common.Persistence;

namespace Shoplists.Application.Modules.ListItems;

public static class UpdateListItem
{
    public sealed record Request(
        Guid Id,
        string Name,
        bool Ticked,
        Guid ListId
    ) : IRequest<ErrorOr<Updated>>;

    internal sealed class Validator : AbstractValidator<Request>
    {
        public Validator()
        {
            RuleFor(r => r.Name)
                .ValidString(true);
        }
    }

    internal sealed class Handler : IRequestHandler<Request, ErrorOr<Updated>>
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

        public async Task<ErrorOr<Updated>> Handle(Request request, CancellationToken cancellationToken)
        {
            _logger.LogDebug("Updating a ListItem");
            
            var list = await _dbContext
                .CurrentUserLists(true)
                .Include(l => l.Items)
                .SingleOrDefaultAsync(l => l.Id == request.ListId, cancellationToken: cancellationToken);
            if (list is null)
            {
                _logger.LogDebug(
                    "Failed to fetch list with ID {ListId} from database: does not exist or does not belong to this user",
                    request.ListId);
                return Error.NotFound(nameof(request.ListId), $"Could not find List with id {request.ListId}");
            }
            _logger.LogDebug("Fetched list and list items from database");

            var listItem = list.Items.SingleOrDefault(i => i.Id == request.Id);
            if (listItem is null)
            {
                _logger
                    .LogDebug(
                        "Failed to retrieve ListItem with ID {ListItemId}: does not exist in this List",
                        request.Id);
                return Error.NotFound(nameof(request.Id), $"Could not find ListItem with id {request.Id}");
            }
            _logger.LogDebug("Retrieved list item to delete from entity");

            listItem.Name = request.Name.Trim();
            listItem.Ticked = request.Ticked;
            _logger.LogDebug("Applied changes from request to entity");

            await _dbContext.SaveChangesAsync(CancellationToken.None);
            _logger.LogDebug("Persisted changes to database");

            return Result.Updated;
        }
    }
}