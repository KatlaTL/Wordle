

const Letter = ({ letter }: { letter: string }) => {

    const toUpperCase = (word: string) => {
        if (!word) return;
        return word.toLocaleUpperCase();
    }

    return (
        <div className="h-15 w-15 border-2 border-gray-300 text-4xl text-center content-center">
            {toUpperCase(letter)}
        </div>
    )
}

export default Letter;