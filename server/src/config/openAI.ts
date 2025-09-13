import { translate } from "@vitalets/google-translate-api";
// import OpenAI from "openai"
export const AITranslate = async (fromLang: string, toLang: string, text: string) => {
    try {
        //code like en es fr de it pt ru ja zh
        const res = await translate(text, { from: fromLang, to: toLang });
        return res.text;

        // const openai = new OpenAI({
        //     baseURL: 'https://openrouter.ai/api/v1',
        //     apiKey: process.env.OPENAI_API_KEY,
        // });
        // const response = await openai.chat.completions.create({
        //     model: "gpt-4o-mini",
        //     messages: [
        //         { role: "system", content: `You are a translation assistant. Translate the following text from ${fromLang} to ${toLang}:` },
        //         { role: "user", content: text },
        //     ],
        // });
        // const translated = response.choices[0].message.content;
        // return translated;

    } catch (error: any) {
        return error.message || "Translation failed";
    }
};