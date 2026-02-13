import { GameSchema, GuessResponseSchema } from "../schemas/gameSchema";
import type { GuessResponseType, NewGameType } from "../types/gameType";


const API_URL = "http://localhost:5000/api/wordle";

export const startNewGame = async (): Promise<NewGameType> => {
    const response = await fetch(API_URL + "/game", {
        method: "POST",
    });

    if (!response.ok) {
        throw new Error(`Failed to start new game: ${response.statusText}`);
    }

    const data = await response.json();

    const parsed = GameSchema.safeParse(data);

    if (!parsed.success) {
        throw new Error("Invalid response data format");
    }

    return parsed.data;
}

export const submitGuess = async (gameId: string, word: string): Promise<GuessResponseType> => {
    const response = await fetch(API_URL + `/game/${gameId}/guess`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ Word: word })
    });

    if (!response.ok) {
        throw new Error(`Failed to submit guess: ${response.statusText}`);
    }

    const data = await response.json();

    const parsed = GuessResponseSchema.safeParse(data);

    if (!parsed.success) {
        throw new Error("Invalid response data format");
    }

    return parsed.data;
}