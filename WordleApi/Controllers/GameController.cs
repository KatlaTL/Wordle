using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/wordle")]
public class GameController : ControllerBase
{
    private readonly IGameService _gameService;
    public GameController(IGameService gameService)
    {
        _gameService = gameService;
    }

    [HttpPost("game")]
    public ActionResult<StartGameResponseDto> NewGame()
    {
        var dto = _gameService.NewGame();
        return CreatedAtAction(nameof(GetGame), new { gameId = dto.GameId }, dto);
    }

    [HttpGet("game/{gameId}")]
    public ActionResult<StartGameResponseDto> GetGame(Guid gameId)
    {
        var dto = _gameService.GetGame(gameId);

        if (dto == null) return NotFound();

        return Ok(dto);
    }

    [HttpPost("game/{gameId}/guess")]
    public ActionResult<GuessWordResponseDto> Guess(Guid gameId, [FromBody] GuessWordRequestDto request)
    {
        // TO-DO add guess logic
        return Ok(new {});
    }
}