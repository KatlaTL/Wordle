public class GameService : IGameService
{
    private readonly IWordRepository _wordRepository;
    private readonly IGameRepository _gameRepository;
    private static readonly Random _rand = Random.Shared;

    public GameService(IWordRepository wordRepository, IGameRepository gameRepository)
    {
        _wordRepository = wordRepository;
        _gameRepository = gameRepository;
    }
    public StartGameResponseDto NewGame()
    {
        var words = _wordRepository.GetAll();
        var solution = words[_rand.Next(words.Count)];

        return _gameRepository.CreateGame(solution).toStartGameResponseDto();
    }

    public StartGameResponseDto? GetGame(Guid gameId)
    {
        var game = _gameRepository.GetGame(gameId);

        if (game == null) return null;

        return game.toStartGameResponseDto();
    }

}