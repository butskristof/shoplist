using ErrorOr;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Shoplists.Application.Common.FluentValidation;
using Shoplists.Application.Common.Persistence;

namespace Shoplists.Application.Modules.Lists;

public static class UpdateList
{
    public record Request(string Name);

    public sealed record Command(Guid Id, string Name) : Request(Name), IRequest<ErrorOr<Updated>>
    {
        public Command(Guid Id, Request request)
            : this(Id, request.Name)
        {
        }
    }

    internal sealed class Validator : AbstractValidator<Command>
    {
        public Validator()
        {
            RuleFor(r => r.Name)
                .Cascade(CascadeMode.Stop)
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
            _logger.LogDebug("Updating a List");

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

            if (await _dbContext
                    .CurrentUserLists(false)
                    // name should be configured with case-insensitive collation
                    .AnyAsync(l => l.Name == command.Name && l.Id != list.Id,
                        cancellationToken: cancellationToken))
            {
                return Error.Conflict(nameof(command.Name));
            }

            list.Name = command.Name.Trim();
            _logger.LogDebug("Applied changes from request to entity");

            await _dbContext.SaveChangesAsync(CancellationToken.None);
            _logger.LogDebug("Persisted changes to database");

            return Result.Updated;
        }
    }
}