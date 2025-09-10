import { z } from "zod";

export const createCallSchema = z.object({
    roomId: z.string().min(1, "Room ID is required"),
    participants: z.array(z.string()).min(1, "At least one participant is required"),
    startedAt: z.date().optional().default(() => new Date()),
    metadata: z.record(z.string(), z.any()).optional(),
})

export const updateCallSchema = z.object({
    endedAt: z.date().optional(),
    metadata: z.record(z.string(), z.any()).optional(),
})

export const createTranscriptSchema = z.object({
    call: z.string().min(1, "Call ID is required"),
    roomId: z.string().min(1, "Room ID is required"),
    fromUser: z.string().min(1, "User ID is required"),
    fromLang: z.enum(["ur", "en"], "From language must be 'ur' or 'en'"),
    originalText: z.string().min(1, "Original text is required"),
    translatedText: z.string().min(1, "Translated text is required"),
    targetLang: z.enum(["ur", "en"], "Target language must be 'ur' or 'en'"),
})

export const getTranscriptsByCallSchema = z.object({
    callId: z.string().min(1, "Call ID is required"),
})

export const getTranscriptsByRoomSchema = z.object({
    roomId: z.string().min(1, "Room ID is required"),
})