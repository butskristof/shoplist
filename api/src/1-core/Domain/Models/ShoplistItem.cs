using Shoplists.Domain.Common;

namespace Shoplists.Domain.Models;

public sealed class ShoplistItem : BaseEntity
{
    public Guid ShoplistId { get; set; }

    public required string Name { get; set; }
}