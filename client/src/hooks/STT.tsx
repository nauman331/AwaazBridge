import { toast } from "sonner";
import { languageMap } from "../utils/exports";

// Type declarations for Web Speech API
declare global {
    interface SpeechRecognitionEvent extends Event {
        results: SpeechRecognitionResultList;
        resultIndex: number;
        interpretation: any;
        emma: Document;
    }

    interface SpeechRecognitionErrorEvent extends Event {
        error: string;
        message: string;
    }

    interface SpeechRecognition extends EventTarget {
        lang: string;
        continuous: boolean;
        interimResults: boolean;
        maxAlternatives: number;
        onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
        onnomatch: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
        onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
        onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
        onend: ((this: SpeechRecognition, ev: Event) => any) | null;
        onspeechstart: ((this: SpeechRecognition, ev: Event) => any) | null;
        onspeechend: ((this: SpeechRecognition, ev: Event) => any) | null;
        onsoundstart: ((this: SpeechRecognition, ev: Event) => any) | null;
        onsoundend: ((this: SpeechRecognition, ev: Event) => any) | null;
        onaudiostart: ((this: SpeechRecognition, ev: Event) => any) | null;
        onaudioend: ((this: SpeechRecognition, ev: Event) => any) | null;
        start(): void;
        stop(): void;
        abort(): void;
    }

    var SpeechRecognition: {
        prototype: SpeechRecognition;
        new(): SpeechRecognition;
    };

    var webkitSpeechRecognition: {
        prototype: SpeechRecognition;
        new(): SpeechRecognition;
    };

    interface Window {
        SpeechRecognition: typeof SpeechRecognition;
        webkitSpeechRecognition: typeof webkitSpeechRecognition;
    }
}

interface STTOptions {
    language?: string; // ISO 639-1 language code
    continuous?: boolean;
    interimResults?: boolean;
    maxAlternatives?: number;
    shouldContinue?: () => boolean; // Function to check if recognition should continue
}

interface STTResult {
    transcript: string;
    confidence: number;
    isFinal: boolean;
}

interface STTCallbacks {
    onResult?: (result: STTResult) => void;
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (error: string) => void;
}

const STT = (options: STTOptions = {}, callbacks: STTCallbacks = {}) => {
    const {
        language = 'en',
        continuous = false,
        interimResults = true,
        maxAlternatives = 1,
        shouldContinue
    } = options;

    const {
        onResult,
        onStart,
        onEnd,
        onError
    } = callbacks;

    // Check if browser supports speech recognition
    const SpeechRecognitionConstructor = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionConstructor) {
        const errorMsg = "Speech recognition is not supported in this browser";
        console.warn(errorMsg);
        toast.error(errorMsg);
        onError?.(errorMsg);
        return null;
    }

    try {
        const recognition = new SpeechRecognitionConstructor();

        recognition.lang = languageMap[language] || `${language}-US`;
        recognition.continuous = continuous;
        recognition.interimResults = interimResults;
        recognition.maxAlternatives = maxAlternatives;

        // Event handlers
        recognition.onstart = () => {
            console.log('Speech recognition started');
            onStart?.();
        };

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            const results = Array.from(event.results);
            const lastResult = results[results.length - 1];

            if (lastResult && lastResult.length > 0) {
                const transcript = lastResult[0].transcript;
                const confidence = lastResult[0].confidence;
                const isFinal = lastResult.isFinal;

                onResult?.({
                    transcript,
                    confidence,
                    isFinal
                });
            }
        };

        recognition.onend = () => {
            console.log('Speech recognition ended');
            onEnd?.();

            // Auto-restart for continuous recognition if needed and allowed
            if (continuous && recognition && (!shouldContinue || shouldContinue())) {
                setTimeout(() => {
                    try {
                        console.log('🔄 Auto-restarting speech recognition');
                        recognition.start();
                    } catch (error) {
                        console.log('⏹️ Recognition already running or cannot restart');
                    }
                }, 100);
            } else if (shouldContinue && !shouldContinue()) {
                console.log('⏹️ STT auto-restart stopped - shouldContinue returned false');
            }
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
            const errorMsg = `Speech recognition error: ${event.error}`;
            console.error(errorMsg);

            let userFriendlyError = "Speech recognition failed";
            let shouldShowToast = true;

            switch (event.error) {
                case 'no-speech':
                    userFriendlyError = "No speech detected. Listening...";
                    shouldShowToast = false; // Don't spam user with no-speech errors
                    break;
                case 'audio-capture':
                    userFriendlyError = "Microphone access denied or unavailable.";
                    break;
                case 'not-allowed':
                    userFriendlyError = "Microphone permission denied.";
                    break;
                case 'network':
                    userFriendlyError = "Network error. Please check your connection.";
                    break;
                case 'language-not-supported':
                    userFriendlyError = "Selected language is not supported.";
                    break;
                case 'aborted':
                    userFriendlyError = "Speech recognition was stopped.";
                    shouldShowToast = false;
                    break;
                default:
                    userFriendlyError = errorMsg;
            }

            if (shouldShowToast) {
                toast.error(userFriendlyError);
            }
            onError?.(userFriendlyError);
        };

        return {
            start: () => {
                try {
                    recognition.start();
                } catch (error) {
                    const errorMsg = "Failed to start speech recognition";
                    console.error(errorMsg, error);
                    toast.error(errorMsg);
                    onError?.(errorMsg);
                }
            },
            stop: () => {
                try {
                    recognition.stop();
                } catch (error) {
                    console.error("Failed to stop speech recognition", error);
                }
            },
            abort: () => {
                try {
                    recognition.abort();
                } catch (error) {
                    console.error("Failed to abort speech recognition", error);
                }
            }
        };

    } catch (error) {
        const errorMsg = "Failed to initialize speech recognition";
        console.error(errorMsg, error);
        toast.error(errorMsg);
        onError?.(errorMsg);
        return null;
    }
};

export default STT;