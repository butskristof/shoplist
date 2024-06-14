using Microsoft.EntityFrameworkCore;
using Shoplists.Domain.Models;

namespace Shoplists.Application.Common.Persistence;

public interface IAppDbContext
{
    DbSet<List> Lists { get; }
    DbSet<ListItem> ListItems { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}