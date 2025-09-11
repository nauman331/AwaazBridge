import OpenAI from "openai"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export const AITranslate = async (fromLang: string, toLang: string, text: string) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `You are a translator engine that translates text from ${fromLang} to ${toLang}. Translate it and provide formal translation`
                },
                { role: "user", content: text }
            ]
        })
        const translation = response.choices[0].message.content
        return translation
    } catch (error) {
        return error
    }
}