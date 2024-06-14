using Shoplists.Domain.Common;

namespace Shoplists.Domain.Models;

public sealed class Shoplist : BaseEntity
{
    public required string Name { get; set; }

    public List<ShoplistItem> Items { get; set; } = [];
}