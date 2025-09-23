import { toast } from "sonner";
import { languageMap } from "../utils/exports";

interface TTSOptions {
    gender?: 'male' | 'female';
    language?: string; // Changed to string to support more language codes
}

// Helper to get voices asynchronously
const getVoices = (): Promise<SpeechSynthesisVoice[]> => {
    return new Promise((resolve) => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length) {
            resolve(voices);
            return;
        }
        window.speechSynthesis.onvoiceschanged = () => {
            resolve(window.speechSynthesis.getVoices());
        };
    });
};

const TTS = async (text: string, options: TTSOptions = {}) => {
    const { gender = 'female', language = 'en' } = options;

    if ('speechSynthesis' in window) {
        try {
            // Cancel any ongoing speech before starting a new one
            if (window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
                console.log('⏹️ Canceled previous TTS playback');
            }

            const utterance = new SpeechSynthesisUtterance(text);

            // Configure voice settings
            utterance.rate = 1.0; // Use a more natural rate
            utterance.pitch = 1.0;
            utterance.volume = 1.0; // Maximum volume for translations

            // Use language map if available, otherwise use the language code directly
            utterance.lang = languageMap[language] || language;

            const voices = await getVoices();
            if (voices.length === 0) {
                console.warn('⚠️ No voices available for speech synthesis.');
                // Speak with the default voice if none are found
                window.speechSynthesis.speak(utterance);
                return;
            }

            // Simplified and more robust voice selection
            const langCode = (languageMap[language] || language).toLowerCase();

            let preferredVoices = voices.filter(voice =>
                voice.lang.toLowerCase().startsWith(langCode)
            );

            if (preferredVoices.length > 0) {
                const genderMatch = gender === 'female' ? /female|woman/i : /male|man/i;
                let genderedVoices = preferredVoices.filter(v => genderMatch.test(v.name));

                // If no gender match, use any voice for the language
                if (genderedVoices.length === 0) {
                    genderedVoices = preferredVoices;
                }

                // Prioritize higher quality or default voices
                const selectedVoice = genderedVoices.find(v => v.default) || genderedVoices[0];
                utterance.voice = selectedVoice;

                console.log('🎤 Selected TTS voice:', {
                    name: selectedVoice.name,
                    lang: selectedVoice.lang,
                    default: selectedVoice.default,
                    textLength: text.length
                });
            } else {
                console.warn(`⚠️ No voice found for language code: ${langCode}. Using browser default.`);
            }

            // Add event listeners for debugging
            utterance.onstart = () => console.log('🎵 TTS started speaking');
            utterance.onend = () => console.log('✅ TTS finished speaking');
            utterance.onerror = (event) => {
                console.error('❌ TTS error:', event.error);
                // Don't toast on 'interrupted' as we do it manually
                if (event.error !== 'interrupted') {
                    toast.error(`Speech error: ${event.error}`);
                }
            };

            console.log('🔊 Starting TTS playback:', text.substring(0, 50) + '...');
            window.speechSynthesis.speak(utterance);

        } catch (error) {
            console.error('TTS Error:', error);
            toast.error("Speech synthesis failed");
        }
    } else {
        console.warn("No TTS service available");
        toast.error("Text-to-speech is not supported in this browser");
    }
};

export default TTS;