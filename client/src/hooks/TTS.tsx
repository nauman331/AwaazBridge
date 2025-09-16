import { toast } from "sonner";
import { languageMap } from "../utils/exports";

interface TTSOptions {
    gender?: 'male' | 'female';
    language?: string; // Changed to string to support more language codes
}

const TTS = (text: string, options: TTSOptions = {}) => {
    const { gender = 'female', language = 'en' } = options;

    if ('speechSynthesis' in window) {
        try {
            const utterance = new SpeechSynthesisUtterance(text);

            // Configure voice settings
            utterance.rate = 0.9;
            utterance.pitch = gender === 'female' ? 1.2 : 0.8;
            utterance.volume = 0.8;

            // Use language map if available, otherwise use the language directly
            utterance.lang = languageMap[language] || `${language}-US`;

            // Try to find a voice that matches gender and language preferences
            const voices = window.speechSynthesis.getVoices();

            let preferredVoice = voices.find(voice => {
                const voiceLang = voice.lang.toLowerCase();
                const voiceName = voice.name.toLowerCase();
                const matchesLanguage = voiceLang.startsWith(language.toLowerCase());
                const matchesGender = gender === 'female'
                    ? voiceName.includes('female') || voiceName.includes('woman') || !voiceName.includes('male')
                    : voiceName.includes('male') || voiceName.includes('man');

                return matchesLanguage && matchesGender;
            });

            // Fallback: find any voice that matches the language
            if (!preferredVoice) {
                preferredVoice = voices.find(voice =>
                    voice.lang.toLowerCase().startsWith(language.toLowerCase())
                );
            }

            // Final fallback: find any voice for common languages
            if (!preferredVoice && ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'ja', 'zh'].includes(language)) {
                preferredVoice = voices.find(voice => {
                    const voiceName = voice.name.toLowerCase();
                    const voiceLang = voice.lang.toLowerCase();
                    const matchesLanguage = voiceLang.includes(language) || voiceLang.startsWith(language);
                    const matchesGender = gender === 'female'
                        ? !voiceName.includes('male') || voiceName.includes('female')
                        : voiceName.includes('male');

                    return matchesLanguage && matchesGender;
                });
            }

            if (preferredVoice) {
                utterance.voice = preferredVoice;
            }

            window.speechSynthesis.speak(utterance);

        } catch (error) {
            console.error('TTS Error:', error);
            toast.error("Speech synthesis failed");
        }
    } else {
        console.warn("No TTS service available");
        toast.error("Text-to-speech is not supported in this browser");
    }
}

export default TTS;