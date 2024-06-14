namespace Shoplists.Bff.Configuration;

internal sealed class RemoteApiSettings
{
    internal const string SectionName = "RemoteApis";
    
    public required string ShoplistsApiUrl { get; init; }
}