using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/wordle")]
public class WordleController : ControllerBase
{  
    private readonly IWordProvider _wordProvider;
    public WordleController (IWordProvider wordProvider)
    {
        _wordProvider = wordProvider;
    }
   [HttpGet]
    public IActionResult Get()
    {
        Console.WriteLine(_wordProvider.GetWords());
        return Ok(new { message = "Hej fra C# backend" });
    }
}