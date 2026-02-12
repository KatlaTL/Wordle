import Word from "../../components/Word";
import { useState } from "react";


const GameBoard = () => {
    const [words, setWords] = useState<string[]>(Array(6).fill(""));

    const updateWord = (index: number, newWord: string) => {
        setWords(prev => {
            const updated = [...prev];
            updated[index] = newWord;
            return updated;
        })
    }

    return (
        <div className="flex justify-center my-10">
            <div className="flex flex-col gap-3 mx-1.5">
                {words.map((word, i) => (
                    <Word
                        key={i}
                        word={word}
                        setWord={(newWord: string) => updateWord(i, newWord)}
                    />
                ))}


            </div>
        </div>
    );
}

export default GameBoard;