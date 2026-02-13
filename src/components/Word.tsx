import { useEffect, useState } from "react";
import Letter from "./Letter";
import { useGameContext } from "../context/gameContext";

type WordProps = {
    word: string;
    correctPositions: number[];
    presentButWrongPositions: number[];
    guessed: boolean;
}

const Word = ({ word, correctPositions, presentButWrongPositions, guessed }: WordProps) => {
    const { newGame } = useGameContext();
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    useEffect(() => {
        if (newGame) {
            setActiveIndex(null)
        }
    }, [newGame]);
    
    useEffect(() => {
        if (guessed) {
            word.split("").forEach((_, index) => {
                setTimeout(() => {
                    setActiveIndex(index);
                }, index * 500);
            })
        }
    }, [guessed]);

    const letters = Array.from({ length: 5 }, (_, i) => {
        const letter = word[i];
        return <Letter
            key={i}
            letter={letter}
            isCorrectPosition={correctPositions?.includes(i)}
            isPresentButWrongPosition={presentButWrongPositions?.includes(i)}
            toAnimate={activeIndex === i}
        />
    });

    return (
        <div className="flex gap-3">
            {letters}
        </div>
    )
}

export default Word;