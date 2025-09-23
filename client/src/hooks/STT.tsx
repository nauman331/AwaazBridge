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
    instanceId?: string; // Add instance ID for multiple STT instances
}

interface STTResult {
    transcript: string;
    confidence: number;
    isFinal: boolean;
    instanceId?: string;
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
        shouldContinue,
        instanceId = 'default'
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
        let isManuallyStopped = false;

        recognition.lang = languageMap[language] || `${language}-US`;
        recognition.continuous = continuous;
        recognition.interimResults = interimResults;
        recognition.maxAlternatives = maxAlternatives;

        // Event handlers
        recognition.onstart = () => {
            console.log(`Speech recognition started [${instanceId}]`);
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
                    isFinal,
                    instanceId
                });
            }
        };

        recognition.onend = () => {
            console.log(`Speech recognition ended [${instanceId}]`);
            onEnd?.();

            // Auto-restart for continuous recognition if not manually stopped
            if (continuous && !isManuallyStopped && (!shouldContinue || shouldContinue())) {
                setTimeout(() => {
                    try {
                        console.log(`🔄 Auto-restarting speech recognition [${instanceId}]`);
                        recognition.start();
                    } catch (error: any) {
                        // This can happen if start() is called while it's already starting.
                        if (error.name !== 'InvalidStateError') {
                            console.error(`❌ Failed to auto-restart STT [${instanceId}]:`, error);
                        }
                    }
                }, 100); // A short delay to prevent frantic restarting
            } else {
                console.log(`⏹️ STT auto-restart prevented. Manual stop: ${isManuallyStopped}, Should continue: ${shouldContinue ? shouldContinue() : 'N/A'} [${instanceId}]`);
            }
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
            const errorMsg = `Speech recognition error [${instanceId}]: ${event.error}`;
            console.error(errorMsg);

            // For critical permission or network errors, stop restart attempts to allow for specific handling.
            if (event.error === 'network' || event.error === 'not-allowed') {
                isManuallyStopped = true;
            }

            // Avoid showing toasts for common, non-critical errors
            if (event.error === 'no-speech' || event.error === 'aborted') {
                onError?.(event.error);
                return;
            }

            let userFriendlyError = "An unknown speech recognition error occurred.";

            switch (event.error) {
                case 'audio-capture':
                    userFriendlyError = `Microphone access denied or unavailable.`;
                    break;
                case 'not-allowed':
                    userFriendlyError = `Microphone permission has been denied.`;
                    break;
                case 'network':
                    userFriendlyError = `A network error occurred during speech recognition.`;
                    break;
                case 'language-not-supported':
                    userFriendlyError = `The selected language is not supported.`;
                    break;
                default:
                    userFriendlyError = `Speech recognition error: ${event.error}`;
            }

            if (instanceId === 'local') { // Only show toasts for the user's own STT
                toast.error(userFriendlyError);
            }
            onError?.(userFriendlyError);
        };

        return {
            start: () => {
                try {
                    isManuallyStopped = false;
                    recognition.start();
                } catch (error: any) {
                    // Prevent crashing if start is called in an invalid state
                    if (error.name === 'InvalidStateError') {
                        console.warn(`⚠️ STT start() called in an invalid state [${instanceId}]. It might already be running.`);
                    } else {
                        const errorMsg = "Failed to start speech recognition";
                        console.error(errorMsg, error);
                        toast.error(errorMsg);
                        onError?.(errorMsg);
                    }
                }
            },
            stop: () => {
                try {
                    isManuallyStopped = true;
                    recognition.stop();
                } catch (error) {
                    console.error("Failed to stop speech recognition", error);
                }
            },
            abort: () => {
                try {
                    isManuallyStopped = true;
                    recognition.abort();
                } catch (error) {
                    console.error("Failed to abort speech recognition", error);
                }
            }
        };

    } catch (error) {
        const errorMsg = `Failed to initialize speech recognition [${instanceId}]`;
        console.error(errorMsg, error);
        if (instanceId === 'local') {
            toast.error(errorMsg);
        }
        onError?.(errorMsg);
        return null;
    }
};

export default STT;