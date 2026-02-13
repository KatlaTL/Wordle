import { useEffect, useState } from "react";
import { useGameContext } from "../context/gameContext";

type LetterProps = {
    letter: string;
    isCorrectPosition: boolean;
    isPresentButWrongPosition: boolean;
    toAnimate?: boolean;
}

const Letter = ({ letter, isCorrectPosition, isPresentButWrongPosition, toAnimate = false }: LetterProps) => {
    const { newGame } = useGameContext();
    const [flipped, setFlipped] = useState<boolean>(false);

    useEffect(() => {
        if (toAnimate) {
            setFlipped(true);
        }
        if (newGame) {
            setFlipped(false);
        }
    }, [toAnimate, newGame])

    const toUpperCase = (word: string) => {
        if (!word) return;
        return word.toLocaleUpperCase();
    }

    const bgColor = (): string => {
        if (isCorrectPosition) return "bg-green-600";
        if (isPresentButWrongPosition) return "bg-yellow-500";
        return "bg-gray-400";
    }

    return (
        <div className="perspective h-15 w-15 text-4xl ">

            <div className={`flip-inner relative border-2 border-gray-300 w-full h-full cursor-pointer ${flipped ? "flipped" : ""}`}>

                {/* Front */}
                <div className={`face absolute inset-0 text-center content-center`}>
                    {toUpperCase(letter)}
                </div>

                {/* Back */}
                <div className={`face absolute back inset-0 text-center content-center ${bgColor()}`}>
                    {toUpperCase(letter)}
                </div>
            </div>
        </div>
    )
}

export default Letter;