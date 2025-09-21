import { translate } from "@vitalets/google-translate-api";
import OpenAI from "openai"
export const AITranslate = async (fromLang: string, toLang: string, text: string) => {
    try {
        // The Google Translate API can be unreliable for this use case.
        // Switching to a more robust LLM-based translation.
        // const res = await translate(text, { from: fromLang, to: toLang });
        // return res.text;

        const openai = new OpenAI({
            baseURL: 'https://openrouter.ai/api/v1',
            apiKey: process.env.OPENAI_API_KEY,
        });
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: `You are a real-time translation assistant. Translate the following text from ${fromLang} to ${toLang}. Be concise and accurate.` },
                { role: "user", content: text },
            ],
            temperature: 0.2, // Lower temperature for more deterministic translations
        });
        const translated = response.choices[0].message.content;
        return translated;

    } catch (error: any) {
        console.error("Translation API Error:", error.message);
        // Return the original text on failure to avoid breaking the flow.
        return text;
    }
};