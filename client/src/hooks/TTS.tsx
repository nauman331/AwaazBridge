import { toast } from "sonner";
import { languageMap } from "../utils/exports";

interface TTSOptions {
    gender?: 'male' | 'female';
    language?: 'en' | 'fr' | 'ur';
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
            utterance.lang = languageMap[language];

            // Try to find a voice that matches gender and language preferences
            const voices = window.speechSynthesis.getVoices();

            let preferredVoice = voices.find(voice => {
                const voiceLang = voice.lang.toLowerCase();
                const voiceName = voice.name.toLowerCase();
                const matchesLanguage = voiceLang.startsWith(language);
                const matchesGender = gender === 'female'
                    ? voiceName.includes('female') || voiceName.includes('woman') || !voiceName.includes('male')
                    : voiceName.includes('male') || voiceName.includes('man');

                return matchesLanguage && matchesGender;
            });

            // Fallback: find any voice that matches the language
            if (!preferredVoice) {
                preferredVoice = voices.find(voice =>
                    voice.lang.toLowerCase().startsWith(language)
                );
            }

            // Final fallback: find any voice that matches gender preference for English
            if (!preferredVoice && language === 'en') {
                preferredVoice = voices.find(voice => {
                    const voiceName = voice.name.toLowerCase();
                    const voiceLang = voice.lang.toLowerCase();
                    const isEnglish = voiceLang.startsWith('en');
                    const matchesGender = gender === 'female'
                        ? !voiceName.includes('male') || voiceName.includes('female')
                        : voiceName.includes('male');

                    return isEnglish && matchesGender;
                });
            }

            if (preferredVoice) {
                utterance.voice = preferredVoice;
            }

            window.speechSynthesis.speak(utterance);

        } catch (error) {
            toast.error("Browser speech synthesis failed");
        }
    } else {
        console.warn("No TTS service available");
        toast.error("Text-to-speech is not supported in this browser");
    }
}

export default TTS;