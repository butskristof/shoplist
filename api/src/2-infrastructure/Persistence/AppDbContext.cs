using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Shoplists.Application.Common.Authentication;
using Shoplists.Application.Common.Constants;
using Shoplists.Application.Common.Persistence;
using Shoplists.Domain.Models;
using Shoplists.Persistence.Common;

namespace Shoplists.Persistence;

public sealed class AppDbContext : DbContext, IAppDbContext
{
    #region construction

    private readonly IAuthenticationInfo _authenticationInfo;

    public AppDbContext(DbContextOptions options, IAuthenticationInfo authenticationInfo) : base(options)
    {
        _authenticationInfo = authenticationInfo;
    }

    #endregion

    #region entities

    public DbSet<List> Lists => Set<List>();

    #endregion

    #region queryables

    public IQueryable<List> CurrentUserLists(bool tracking)
    {
        var query = Lists
            .Where(l => l.Owner == _authenticationInfo.UserId)
            .AsQueryable();

        if (!tracking) query = query.AsNoTracking();

        return query;
    }

    #endregion

    #region configuration

    protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
    {
        // the base method is empty, but retain the call to minimise impact if
        // it should be used in a future version
        base.ConfigureConventions(configurationBuilder);

        // set text fields to have a reduced maximum length by default 
        // this cuts down on a lot of varchar(max) columns, and can still be set to a higher 
        // maximum length on a per-column basis
        configurationBuilder
            .Properties<string>()
            .HaveMaxLength(ApplicationConstants.DefaultMaxStringLength);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // the base method is empty, but retain the call to minimise impact if
        // it should be used in a future version
        base.OnModelCreating(modelBuilder);

        modelBuilder.HasCollation(
            PersistenceConstants.CaseInsensitiveCollation,
            locale: "en-u-ks-primary",
            provider: "icu",
            deterministic: false
        );
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }

    #endregion
}