
public interface IGameService
{
   StartGameResponseDto NewGame();
   StartGameResponseDto? GetGame(Guid gameId);

   
}