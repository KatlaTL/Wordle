import Word from "../../components/Word";
import { useEffect, useState } from "react";
import useGame from "../../hooks/useGame";
import { useNewGameMutation } from "../../hooks/useNewGameMutation";


const GameBoard = () => {
    const { guessMutation, actionDispatch, correctPositions = [], presentButWrongPositions = [] } = useGame();
    const newGameMutation = useNewGameMutation((game) => actionDispatch?.setNewGame(game));

    const [words, setWords] = useState<string[]>(Array(6).fill(""));
    const [wordsGuessed, setWordsGussed] = useState<boolean[]>(Array(6).fill(false));
    const [activeRow, setActiveRow] = useState<number>(0);

    const [isFinished, setIsFinished] = useState<boolean>(false);
    const [gameStatus, setGameStatus] = useState<string>("")

    const wordMaxLength = 5;

    const handleGuess = (word: string) => {
        guessMutation.mutate({ word }, {
            onSuccess: (data) => {
                actionDispatch?.setCorrectPositions(data.correctPositions, activeRow);
                actionDispatch?.setPresentButWrongPositions(data.presentButWrongPositions, activeRow);
                actionDispatch?.decrementAttemptsLeft();

                if (data.isFinished) {
                    if (data.isCorrect) {
                        setGameStatus("Won");
                    } else {
                        setGameStatus("Lost");
                    }

                    setIsFinished(data.isFinished);
                }

                setWordsGussed(prev => {
                    const updated = [...prev];
                    updated[activeRow] = true;

                    return updated;
                })

                setActiveRow(prev => prev + 1);
            }
        })
    }

    const handleNewGame = () => {
        newGameMutation.mutate();
        setActiveRow(0);
        setIsFinished(false);
        setWords(Array(6).fill(""));
        setWordsGussed(Array(6).fill(false));
        setGameStatus("");
    }

    /**
     * Listen on keydown events from the keyboard 
     */
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (isFinished) return;

            const key = event.key;

            // Enter → move to next row
            if (key === "Enter" && words[activeRow].length === wordMaxLength) {
                handleGuess(words[activeRow]);
                return;
            }

            setWords(prev => {
                const updated = [...prev];
                const currentWord = updated[activeRow];

                // Only allow letters a-z or A-Z
                if (/^[a-zA-Z]$/.test(key) && currentWord.length < wordMaxLength) {
                    updated[activeRow] = currentWord + key;
                }

                // Backspace
                if (key === "Backspace") {
                    updated[activeRow] = currentWord.slice(0, -1);
                }

                return updated;
            })

        }

        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [words, activeRow, isFinished])

    return (
        <div className="flex justify-center my-10">
            <div className="flex flex-col gap-3 mx-1.5">
                {words.map((word, i) => (
                    <Word
                        key={i}
                        word={word}
                        correctPositions={correctPositions[i]}
                        presentButWrongPositions={presentButWrongPositions[i]}
                        guessed={wordsGuessed[i]}
                    />
                ))}


                {isFinished && (
                    <div>
                        <p>Game is Finished! You {gameStatus}</p>
                        <button className="flex items-center justify-center mx-auto w-full rounded-lg border hover:cursor-pointer outline-none hover:bg-green-100" onClick={() => handleNewGame()}>Click to start a new game</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default GameBoard;