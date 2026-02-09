using System.Collections.Concurrent;

public class InMemoryGameRepository : IGameRepository
{
    private readonly ConcurrentDictionary<Guid, Game> _games = new();

    public Game CreateGame(Word solution)
    {
        var game = new Game { Solution = solution };

        _games[game.Id] = game;

        return game;
    }

    public Game? GetGame(Guid gameId)
    {
        _games.TryGetValue(gameId, out var game);

        return game;
    }
}