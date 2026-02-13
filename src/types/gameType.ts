import z from "zod";
import type { GameSchema, GuessResponseSchema } from "../schemas/gameSchema";

export type Nullable<T> = {
    [P in keyof T]: T[P] | null;
};

export type NewGameType = z.infer<typeof GameSchema>;

export type GuessResponseType = z.infer<typeof GuessResponseSchema>;

export type GamePositions = {
    correctPositions: number[][];
    presentButWrongPositions: number[][]
}

export type GameStateType = Nullable<NewGameType> & GamePositions & {
    newGame: boolean;
};

export interface GameContextI extends GameStateType {
    actionDispatch: {
        setNewGame: (game: NewGameType) => void;
        setCorrectPositions: (correctPositions: number[], activeRow: number) => void;
        setPresentButWrongPositions: (presentButWrongPositions: number[], activeRow: number) => void;
        decrementAttemptsLeft: () => void;
    } | null;
}

export const GameActionTypes = {
    NEW_GAME: "NEW_GAME",
    SET_CORRECT_POSITIONS: "SET_CORRECT_POSITIONS",
    SET_PRESENT_POSITIONS: "SET_PRESENT_POSITIONS",
    DECREMENT_ATTEMPTS_LEFT: "DECREMENT_ATTEMPTS_LEFT",
} as const;

export type GameActionTypes = typeof GameActionTypes[keyof typeof GameActionTypes];

export type GameReducerActionType =
    { type: typeof GameActionTypes.NEW_GAME, payload: { game: NewGameType, } } |
    { type: typeof GameActionTypes.SET_CORRECT_POSITIONS, payload: { correctPositions: number[], activeRow: number } } |
    { type: typeof GameActionTypes.SET_PRESENT_POSITIONS, payload: { presentButWrongPositions: number[], activeRow: number} } |
    { type: typeof GameActionTypes.DECREMENT_ATTEMPTS_LEFT } 