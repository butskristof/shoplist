using ErrorOr;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.Logging;
using Shoplists.Application.Common.FluentValidation;

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

        public Handler(ILogger<Handler> logger)
        {
            _logger = logger;
        }

        #endregion

        public Task<ErrorOr<Response>> Handle(Request request, CancellationToken cancellationToken)
        {
            _logger.LogDebug("Creating a new List");
            throw new NotImplementedException();
        }
    }
}