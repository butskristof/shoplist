using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Shoplists.Domain.Models;
using Shoplists.Persistence.Common;

namespace Shoplists.Persistence.EntityTypeConfigurations;

internal sealed class ListConfiguration : IEntityTypeConfiguration<List>
{
    public void Configure(EntityTypeBuilder<List> builder)
    {
        builder
            .Property(e => e.Name)
            .UseCollation(PersistenceConstants.CaseInsensitiveCollation);
        
        builder
            .HasIndex(e => new { e.Name, e.Owner })
            .UseCollation(PersistenceConstants.CaseInsensitiveCollation)
            .IsUnique();
        
        builder
            .Property(e => e.Owner)
            .IsRequired();
    }
}