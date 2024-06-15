using Microsoft.EntityFrameworkCore;
using Shoplists.Domain.Models;

namespace Shoplists.Application.Common.Persistence;

public interface IAppDbContext
{
    DbSet<List> Lists { get; }

    IQueryable<List> CurrentUserLists(bool tracking);

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}