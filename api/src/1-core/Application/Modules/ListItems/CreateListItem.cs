using ErrorOr;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Shoplists.Application.Common.FluentValidation;
using Shoplists.Application.Common.Persistence;
using Shoplists.Domain.Models;

namespace Shoplists.Application.Modules.ListItems;

public static class CreateListItem
{
    public record Request(string Name);

    public sealed record Command(Guid ListId, string Name)
        : Request(Name), IRequest<ErrorOr<Response>>;

    public sealed record Response(Guid Id, string Name, bool Ticked, Guid ListId);

    internal sealed class Validator : AbstractValidator<Command>
    {
        public Validator()
        {
            RuleFor(r => r.Name)
                .ValidString(true);
        }
    }

    internal sealed class Handler : IRequestHandler<Command, ErrorOr<Response>>
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

        public async Task<ErrorOr<Response>> Handle(Command command, CancellationToken cancellationToken)
        {
            _logger.LogDebug("Creating a new ListItem");

            // TODO check duplicate?
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

            _logger.LogDebug("Fetched list to add to item to from database");

            var listItem = new ListItem
            {
                Name = command.Name.Trim()
            };
            _logger.LogDebug("Mapped command to entity");

            list.Items.Add(listItem);
            await _dbContext.SaveChangesAsync(CancellationToken.None);
            _logger.LogDebug("Persisted new item to database");

            var response = new Response(listItem.Id, listItem.Name, listItem.Ticked, listItem.ListId);
            _logger.LogDebug("Mapped entity to reponse DTO");

            return response;
        }
    }
}