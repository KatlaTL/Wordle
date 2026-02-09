public static class GameMapper
{
    public static StartGameResponseDto toStartGameResponseDto(this Game game)
    {
        return new StartGameResponseDto
        {
            GameId = game.Id,
            Word = game.Solution.Value,
            AttemptsLeft = game.AttemptsLeft
        };
    }
}