import Letter from "./Letter";

type WordProps = {
    word: string;
}

const Word = ({ word }: WordProps) => {

    const letters = Array.from({ length: 5 }, (_, i) => {
        const letter = word[i];
        return <Letter key={i} letter={letter} />
    });

    return (
        <div className="flex gap-3" >
            {letters}
        </div>
    )
}

export default Word;