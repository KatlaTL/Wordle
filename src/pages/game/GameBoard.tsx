import Word from "../../components/Word";
import { useEffect, useState } from "react";


const GameBoard = () => {
    const [words, setWords] = useState<string[]>(Array(6).fill(""));
    const [activeRow, setActiveRow] = useState<number>(0);

    /**
     * Listen on keydown events from the keyboard 
     */
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const key = event.key;

            setWords(prev => {
                const updated = [...prev];
                const currentWord = updated[activeRow];

                // Only allow letters a-z or A-Z
                if (/^[a-zA-Z]$/.test(key)) {

                    if (currentWord.length < 5) {
                        updated[activeRow] = currentWord + key;
                    }

                    return updated;
                }

                // Backspace
                if (key === "Backspace") {
                    updated[activeRow] = currentWord.slice(0, -1);
                }

                // Enter → move to next row
                if (key === "Enter" && currentWord.length === 5) {
                    setActiveRow(prev => prev + 1);
                }

                return updated;
            })


        }
        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [activeRow])

    return (
        <div className="flex justify-center my-10">
            <div className="flex flex-col gap-3 mx-1.5">
                {words.map((word, i) => (
                    <Word
                        key={i}
                        word={word}
                    />
                ))}


            </div>
        </div>
    );
}

export default GameBoard;