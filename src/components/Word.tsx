import { useEffect } from "react";
import Letter from "./Letter";

type WordProps = {
    word: string;
    setWord: (newWord: string) => void;
}

const Word = ({ word, setWord }: WordProps) => {
    console.log(word)

    const letters = Array.from({ length: 5 }, (_, i) => {
        const letter = word[i];
        return <Letter key={i} letter={letter} />
    });

    const addletter = (letter: string) => {
        console.log(word)
        if (word.length < 5) {
            setWord(word + letter);
        }
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const key = event.key;

            // Only allow letters a-z or A-Z
            if (/^[a-zA-Z]$/.test(key)) {
                addletter(key);
            }
        }
        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [])

    return (
        <div className="flex gap-3" >
            {letters}
        </div>
    )
}

export default Word;