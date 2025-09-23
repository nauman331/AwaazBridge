import { translate } from "@vitalets/google-translate-api";
import OpenAI from "openai";

// Enhanced language mapping for better translation accuracy
const languageMap: Record<string, string> = {
    'en': 'English',
    'ur': 'Urdu',
    'ar': 'Arabic',
    'hi': 'Hindi',
    'es': 'Spanish',
    'fr': 'French',
    'de': 'German',
    'zh': 'Chinese (Mandarin)',
    'ja': 'Japanese',
    'ko': 'Korean',
    'ru': 'Russian',
    'pt': 'Portuguese',
    'it': 'Italian',
    'tr': 'Turkish',
    'nl': 'Dutch',
};

export const AITranslate = async (fromLang: string, toLang: string, text: string): Promise<string> => {
    // Input validation
    if (!text || !text.trim()) {
        console.warn('Empty text provided for translation');
        return '';
    }

    if (fromLang === toLang) {
        console.log('Same language detected, returning original text');
        return text;
    }

    const sourceLang = languageMap[fromLang] || fromLang;
    const targetLang = languageMap[toLang] || toLang;

    try {
        console.log(`🌐 Translating from ${sourceLang} to ${targetLang}: "${text.substring(0, 50)}..."`);

        const openai = new OpenAI({
            baseURL: 'https://openrouter.ai/api/v1',
            apiKey: process.env.OPENAI_API_KEY,
        });

        const systemPrompt = `You are a professional real-time translation assistant specialized in conversational speech. 

CRITICAL INSTRUCTIONS:
1. Translate ONLY the provided text from ${sourceLang} to ${targetLang}.
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
            temperature: 0.1, // Very low temperature for consistent translations
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
        console.error("❌ AI Translation Error:", {
            message: error.message,
            fromLang: sourceLang,
            toLang: targetLang,
            textLength: text.length
        });

        // Fallback to Google Translate if AI fails
        try {
            console.log('🔄 Falling back to Google Translate...');
            const res = await translate(text, { from: fromLang, to: toLang });
            console.log('✅ Google Translate fallback successful');
            return res.text;
        } catch (googleError: any) {
            console.error("❌ Google Translate fallback failed:", googleError.message);
            // Return original text as last resort
            return text;
        }
    }
};

// Helper function to detect if text needs translation
export const shouldTranslate = (text: string, fromLang: string, toLang: string): boolean => {
    if (!text || !text.trim() || fromLang === toLang) {
        return false;
    }

    // Skip very short texts that might be artifacts
    if (text.trim().length < 2) {
        return false;
    }

    // Skip texts that are only punctuation or numbers
    const alphaNumericPattern = /[a-zA-Z\u0600-\u06FF\u0900-\u097F\u4e00-\u9fff]/;
    if (!alphaNumericPattern.test(text)) {
        return false;
    }

    return true;
};

// Enhanced translation with preprocessing
export const enhancedTranslate = async (fromLang: string, toLang: string, text: string): Promise<string> => {
    if (!shouldTranslate(text, fromLang, toLang)) {
        return text;
    }

    // Clean and preprocess text
    const cleanedText = text
        .trim()
        .replace(/\s+/g, ' ') // Normalize whitespace
        .replace(/\.{2,}/g, '...'); // Normalize ellipsis

    return await AITranslate(fromLang, toLang, cleanedText);
};