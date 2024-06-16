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
    public sealed record Request(Guid ListId, string Name) : IRequest<ErrorOr<Response>>;

    public sealed record Response(Guid Id, string Name, bool Ticked, Guid ListId);

    internal sealed class Validator : AbstractValidator<Request>
    {
        public Validator()
        {
            RuleFor(r => r.Name)
                .ValidString(true);
        }
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
            _logger.LogDebug("Creating a new ListItem");

            // TODO check duplicate?
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
            _logger.LogDebug("Fetched list to add to item to from database");

            var listItem = new ListItem
            {
                Name = request.Name.Trim()
            };
            _logger.LogDebug("Mapped request to entity");

            list.Items.Add(listItem);
            await _dbContext.SaveChangesAsync(CancellationToken.None);
            _logger.LogDebug("Persisted new item to database");

            var response = new Response(listItem.Id, listItem.Name, listItem.Ticked, listItem.ListId);
            _logger.LogDebug("Mapped entity to reponse DTO");
            
            return response;
        }
    }
}