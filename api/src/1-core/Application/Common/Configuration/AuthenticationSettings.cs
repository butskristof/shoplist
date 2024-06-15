using FluentValidation;
using Shoplists.Application.Common.FluentValidation;

namespace Shoplists.Application.Common.Configuration;

public sealed record AuthenticationSettings
{
    public required string Issuer { get; init; }
    public required string[] Audiences { get; init; }
}

internal sealed class AuthenticationSettingsValidator : AbstractValidator<AuthenticationSettings>
{
    public AuthenticationSettingsValidator()
    {
        RuleFor(r => r.Issuer)
            .Cascade(CascadeMode.Stop)
            .NotEmptyWithErrorCode()
            .Url();

        RuleFor(r => r.Audiences)
            .Cascade(CascadeMode.Stop)
            .NotEmptyWithErrorCode();

        RuleForEach(r => r.Audiences)
            .NotEmptyWithErrorCode(ErrorCodes.Invalid);
    }
}