using Shoplists.Domain.Common;

namespace Shoplists.Domain.Models;

public sealed class ListItem : BaseEntity
{
    public Guid ListId { get; set; }

    public required string Name { get; set; }
    public bool Ticked { get; set; } = false;
}