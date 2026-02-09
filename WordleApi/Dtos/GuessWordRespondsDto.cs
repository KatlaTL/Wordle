
public class GuessWordResponseDto
{
    public string Word {get; set;} = String.Empty; //The guessed word
    public bool isCorrect {get; set;}
    public int AttemptsLeft { get; set; }
    public int[] CorrectPositions { get; set; } = Array.Empty<int>(); // indexes of the letters in the word that are correct
    public int[] PresentButWrongPosition { get; set; } = Array.Empty<int>(); // indexs of the letters in the word that present in the word but in a wrong position
}