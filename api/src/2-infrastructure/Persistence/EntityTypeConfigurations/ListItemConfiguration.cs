using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Shoplists.Domain.Models;

namespace Shoplists.Persistence.EntityTypeConfigurations;

internal sealed class ListItemConfiguration : IEntityTypeConfiguration<ListItem>
{
    public void Configure(EntityTypeBuilder<ListItem> builder)
    {
        builder
            .ToTable("ListItems");
        
        builder
            .HasOne<List>()
            .WithMany(l => l.Items)
            .HasForeignKey(li => li.ListId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}