using System.Security.Authentication;
using ErrorOr;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.Logging;
using Shoplists.Application.Common.Authentication;
using Shoplists.Application.Common.FluentValidation;
using Shoplists.Application.Common.Persistence;
using Shoplists.Domain.Models;

namespace Shoplists.Application.Modules.Lists;

public static class CreateList
{
    public sealed record Request(
        string Name
    ) : IRequest<ErrorOr<Response>>;

    public sealed record Response(
        Guid Id,
        string Name
    );

    internal sealed class Validator : AbstractValidator<Request>
    {
        public Validator()
        {
            RuleFor(r => r.Name)
                .ValidString();
        }
    }

    internal sealed class Handler : IRequestHandler<Request, ErrorOr<Response>>
    {
        #region construction

        private readonly ILogger<Handler> _logger;
        private readonly IAppDbContext _db;
        private readonly IAuthenticationInfo _authenticationInfo;

        public Handler(ILogger<Handler> logger, IAppDbContext db, IAuthenticationInfo authenticationInfo)
        {
            _logger = logger;
            _db = db;
            _authenticationInfo = authenticationInfo;
        }

        #endregion

        public async Task<ErrorOr<Response>> Handle(Request request, CancellationToken cancellationToken)
        {
            _logger.LogDebug("Creating a new List");

            var owner = _authenticationInfo.UserId ?? throw new AuthenticationException("Could not determine user ID");
            var list = new List { Name = request.Name, Owner = owner };
            _logger.LogDebug("Mapped request to entity");

            _db.Lists.Add(list);
            await _db.SaveChangesAsync(CancellationToken.None);
            _logger.LogDebug("Persisted new entity to database");

            var response = new Response(list.Id, list.Name);
            _logger.LogDebug("Mapped entity to response DTO");

            return response;
        }
    }
}