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
    public sealed record Request(Guid Id, string Name) : IRequest<ErrorOr<Updated>>;

    internal sealed class Validator : AbstractValidator<Request>
    {
        public Validator()
        {
            RuleFor(r => r.Name)
                .Cascade(CascadeMode.Stop)
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
            _logger.LogDebug("Updating a List");

            var list = await _dbContext
                .CurrentUserLists(true)
                .SingleOrDefaultAsync(l => l.Id == request.Id, cancellationToken: cancellationToken);
            if (list is null)
            {
                _logger.LogDebug(
                    "Failed to fetch list with ID {Id} from database: does not exist or does not belong to this user",
                    request.Id);
                return Error.NotFound(nameof(request.Id), $"Could not find List with id {request.Id}");
            }

            if (await _dbContext
                    .CurrentUserLists(false)
                    // name should be configured with case-insensitive collation
                    .AnyAsync(l => l.Name == request.Name && l.Id != list.Id,
                        cancellationToken: cancellationToken))
            {
                return Error.Conflict(nameof(request.Name));
            }

            list.Name = request.Name.Trim();
            _logger.LogDebug("Applied changes from request to entity");

            await _dbContext.SaveChangesAsync(CancellationToken.None);
            _logger.LogDebug("Persisted changes to database");
            
            return Result.Updated;
        }
    }
}