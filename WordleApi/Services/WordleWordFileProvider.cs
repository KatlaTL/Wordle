public class WordleWordFileProvider : IWordProvider
{
    private readonly List<string> _words;

    public WordleWordFileProvider()
    {
        var filePath = Path.Combine(AppContext.BaseDirectory, "Data", "wordle_ord.txt");
        _words = File.ReadLines(filePath).ToList();
    }

    public List<string> GetWords()
    {
        return _words;
    }
}