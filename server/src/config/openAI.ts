import { translate } from "@vitalets/google-translate-api";

export const AITranslate = async (fromLang: string, toLang: string, text: string) => {
    try {
        //code like en es fr de it pt ru ja zh
        const res = await translate(text, { from: fromLang, to: toLang });
        return res.text;
    } catch (error: any) {
        return error.message || "Translation failed";
    }
};