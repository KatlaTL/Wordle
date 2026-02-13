import { createContext, useContext, useEffect, useReducer, type PropsWithChildren } from "react";
import type { GameContextI, GameReducerActionType, GameStateType, NewGameType } from "../types/gameType";
import { useNewGameMutation } from "../hooks/useNewGameMutation";

const reducerInitialState: GameStateType = {
    gameId: null,
    attemptsLeft: null,
    wordLength: null,
    correctPositions: [],
    presentButWrongPositions: [],
    newGame: false
};

const contextInitialState: GameContextI = {
    ...reducerInitialState,
    actionDispatch: null
}

const GameContext = createContext<GameContextI>(contextInitialState);

const gameProducer = (state: GameStateType, action: GameReducerActionType): GameStateType => {
    switch (action.type) {
        case "NEW_GAME":
            return {
                ...state,
                gameId: action.payload.game.gameId,
                wordLength: action.payload.game.wordLength,
                attemptsLeft: action.payload.game.attemptsLeft,
                correctPositions: Array.from({ length: action.payload.game.attemptsLeft }),
                presentButWrongPositions: Array.from({ length: action.payload.game.attemptsLeft }),
                newGame: true
            }
        case "SET_CORRECT_POSITIONS":
            return {
                ...state,
                correctPositions: state.correctPositions.map((row, index) => index === action.payload.activeRow ? [...action.payload.correctPositions] : row)
            }
        case "SET_PRESENT_POSITIONS":
            return {
                ...state,
                presentButWrongPositions: state.presentButWrongPositions.map((row, index) => index === action.payload.activeRow ? [...action.payload.presentButWrongPositions] : row)
            }
        case "DECREMENT_ATTEMPTS_LEFT":
            return {
                ...state,
                attemptsLeft: state.attemptsLeft ? state.attemptsLeft - 1 : null,
                newGame: false
            }
        default:
            return state;
    }
}

/**
 * Game context provider 
 * @returns Context provider
 */
export const GameProvider = ({ children }: PropsWithChildren) => {
    const [state, dispatch] = useReducer(gameProducer, reducerInitialState);

    const newGameMutation = useNewGameMutation((game: NewGameType) => dispatch({ type: "NEW_GAME", payload: { game } }));

    useEffect(() => {
        newGameMutation.mutate();
    }, [])

    const actionDispatch = {
        setNewGame: (game: NewGameType) => {
            dispatch({
                type: "NEW_GAME",
                payload: {
                    game
                }
            })
        },
        setCorrectPositions: (correctPositions: number[], activeRow: number) => {
            dispatch({
                type: "SET_CORRECT_POSITIONS",
                payload: {
                    correctPositions,
                    activeRow
                }
            })
        },
        setPresentButWrongPositions: (presentButWrongPositions: number[], activeRow: number) => {
            dispatch({
                type: "SET_PRESENT_POSITIONS",
                payload: {
                    presentButWrongPositions,
                    activeRow
                }
            })
        },
        decrementAttemptsLeft: () => {
            dispatch({
                type: "DECREMENT_ATTEMPTS_LEFT"
            })
        }
    } as GameContextI["actionDispatch"]

    return (
        <GameContext.Provider value={{
            gameId: state.gameId,
            attemptsLeft: state.attemptsLeft,
            correctPositions: state.correctPositions,
            presentButWrongPositions: state.presentButWrongPositions,
            wordLength: state.wordLength,
            newGame: state.newGame,
            actionDispatch: actionDispatch
        }}>
            {children}
        </GameContext.Provider>
    )
}

/**
 * Hook which checks if the game context is defined
 * @returns Game context
 */
export const useGameContext = () => {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error('useGameContext must be used within a LoadingProvider');
    }
    return context;
};