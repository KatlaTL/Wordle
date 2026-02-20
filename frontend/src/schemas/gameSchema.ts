import z from "zod";


export const GameSchema = z.object({
    gameId: z.string().trim().min(1, "gameId cannot be empty"),
    wordLength: z.number(),
    attemptsLeft: z.number()
}).superRefine((data, ctx) => {
    if (data.wordLength !== 5) {
        ctx.addIssue({ code: "custom", message: "wordLength must be 5" });
    }
    if (data.attemptsLeft !== 6) {
        ctx.addIssue({ code: "custom", message: "attemptsLeft must be 6" });
    }
})


export const GuessResponseSchema = z.object({
    word: z.string().trim().min(5, "word length must be 5 chars"),
    isCorrect: z.boolean(),
    isFinished: z.boolean(),
    attemptsLeft: z.number(),
    correctPositions: z.array(z.number()),
    presentButWrongPositions: z.array(z.number())
})
