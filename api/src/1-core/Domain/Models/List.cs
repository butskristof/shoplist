using Shoplists.Domain.Common;

namespace Shoplists.Domain.Models;

public sealed class List : BaseEntity
{
    public required string Name { get; set; }

    public List<ListItem> Items { get; set; } = [];
}