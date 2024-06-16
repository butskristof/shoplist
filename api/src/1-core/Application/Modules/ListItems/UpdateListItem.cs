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
    public record Request(
        string Name,
        bool Ticked
    );

    public sealed record Command(
        Guid Id,
        Guid ListId,
        string Name,
        bool Ticked
    ) : Request(Name, Ticked), IRequest<ErrorOr<Updated>>
    {
        public Command(Guid Id, Guid ListId, Request request)
            : this(Id, ListId, request.Name, request.Ticked)
        {
        }
    }

    internal sealed class Validator : AbstractValidator<Command>
    {
        public Validator()
        {
            RuleFor(r => r.Name)
                .ValidString(true);
        }
    }

    internal sealed class Handler : IRequestHandler<Command, ErrorOr<Updated>>
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

        public async Task<ErrorOr<Updated>> Handle(Command command, CancellationToken cancellationToken)
        {
            _logger.LogDebug("Updating a ListItem");

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

            var listItem = list.Items.SingleOrDefault(i => i.Id == command.Id);
            if (listItem is null)
            {
                _logger
                    .LogDebug(
                        "Failed to retrieve ListItem with ID {ListItemId}: does not exist in this List",
                        command.Id);
                return Error.NotFound(nameof(command.Id), $"Could not find ListItem with id {command.Id}");
            }

            _logger.LogDebug("Retrieved list item to delete from entity");

            listItem.Name = command.Name.Trim();
            listItem.Ticked = command.Ticked;
            _logger.LogDebug("Applied changes from request to entity");

            await _dbContext.SaveChangesAsync(CancellationToken.None);
            _logger.LogDebug("Persisted changes to database");

            return Result.Updated;
        }
    }
}