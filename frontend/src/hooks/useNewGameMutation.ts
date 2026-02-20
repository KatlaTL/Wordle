import { useMutation } from "@tanstack/react-query";
import type { NewGameType } from "../types/gameType";
import { startNewGame } from "../services/gameService";

export const useNewGameMutation = (onSuccess?: (game: NewGameType) => void) => {
  return useMutation({
    mutationFn: startNewGame,
    onError: (err) => console.error(err),
    onSuccess
  });
};

export default useNewGameMutation;