import { useMutation } from "@tanstack/react-query";
import { useGameContext } from "../context/gameContext";
import { submitGuess } from "../services/gameService";

const useGame = () => {
    const { gameId, actionDispatch, ...rest } = useGameContext();

    const guessMutation = useMutation({
        mutationFn: ({ word }: { word: string }) => {
            if (!gameId) throw new Error("Game ID is required");

            return submitGuess(gameId, word);
        },
        onError: (err) => console.error(err)
    })

    return {
        guessMutation,
        actionDispatch,
        ...rest
    }
}

export default useGame;