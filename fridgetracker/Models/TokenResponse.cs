namespace FridgeTracker.Models.Auth
{
    public class TokenResponse
    {
        public string Token { get; set; } = string.Empty;
        public string Id { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public DateTime Expiration { get; set; }
    }
}