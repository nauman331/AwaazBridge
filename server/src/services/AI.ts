import OpenAI from "openai";

export const AITranslate = async (text: string) => {
    try {

        const openai = new OpenAI({
            baseURL: 'https://openrouter.ai/api/v1',
            apiKey: process.env.OPENAI_API_KEY,
        });

        const systemPrompt = `You are a professional real-time translation assistant specialized in conversational speech. 

CRITICAL INSTRUCTIONS:
1. Translate ONLY the provided text.
2. Maintain the conversational tone and emotional context.
3. Keep cultural nuances and expressions when possible.
4. For Urdu translations, use proper Urdu script and romanization when appropriate.
5. Provide ONLY the translation - no explanations, notes, or additional text.
6. If the text contains informal speech, slang, or incomplete sentences, translate it naturally.
7. Handle interruptions, partial words, and speech patterns appropriately.

EXAMPLES:
- "How are you?" → "آپ کیسے ہیں؟" (for English to Urdu)
- "میں ٹھیک ہوں" → "I am fine" (for Urdu to English)`;

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: text }
            ],
            temperature: 0.1,
            max_tokens: 500,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        const translated = response.choices[0]?.message?.content?.trim();

        if (!translated) {
            console.error('❌ Empty translation received from AI, falling back...');
            throw new Error("Empty translation from AI"); // Trigger the catch block for fallback
        }

        console.log(`✅ Translation successful: "${translated.substring(0, 50)}..."`);
        return translated;

    } catch (error: any) {
        console.error("❌ AI Translation Error:", { message: error.message });
    }
};