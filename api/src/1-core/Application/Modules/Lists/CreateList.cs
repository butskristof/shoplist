using System.Security.Authentication;
using ErrorOr;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Shoplists.Application.Common.Authentication;
using Shoplists.Application.Common.FluentValidation;
using Shoplists.Application.Common.Persistence;
using Shoplists.Domain.Models;

namespace Shoplists.Application.Modules.Lists;

public static class CreateList
{
    public record Request(string Name);

    public sealed record Command(
        string Name
    ) : Request(Name), IRequest<ErrorOr<Response>>
    {
        public Command(Request request)
            : this(request.Name)
        {
        }
    }

    public sealed record Response(
        Guid Id,
        string Name
    );

    internal sealed class Validator : AbstractValidator<Command>
    {
        public Validator()
        {
            RuleFor(r => r.Name)
                .Cascade(CascadeMode.Stop)
                .ValidString(true);
        }
    }

    internal sealed class Handler : IRequestHandler<Command, ErrorOr<Response>>
    {
        #region construction

        private readonly ILogger<Handler> _logger;
        private readonly IAppDbContext _dbContext;
        private readonly IAuthenticationInfo _authenticationInfo;

        public Handler(ILogger<Handler> logger, IAppDbContext dbContext, IAuthenticationInfo authenticationInfo)
        {
            _logger = logger;
            _dbContext = dbContext;
            _authenticationInfo = authenticationInfo;
        }

        #endregion

        public async Task<ErrorOr<Response>> Handle(Command command, CancellationToken cancellationToken)
        {
            _logger.LogDebug("Creating a new List");

            if (await _dbContext
                    .CurrentUserLists(false)
                    // name should be configured with case-insensitive collation
                    .AnyAsync(l => l.Name == command.Name, cancellationToken: cancellationToken))
            {
                return Error.Conflict(nameof(command.Name));
            }

            var owner = _authenticationInfo.UserId ??
                        throw new AuthenticationException("Could not determine user ID");
            var list = new List { Name = command.Name, Owner = owner };
            _logger.LogDebug("Mapped request to entity");

            _dbContext.Lists.Add(list);
            await _dbContext.SaveChangesAsync(CancellationToken.None);
            _logger.LogDebug("Persisted new entity to database");

            var response = new Response(list.Id, list.Name.Trim());
            _logger.LogDebug("Mapped entity to response DTO");

            return response;
        }
    }
}