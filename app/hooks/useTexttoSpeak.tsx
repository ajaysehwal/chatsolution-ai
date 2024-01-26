import { useEffect, useState, useCallback } from 'react';

interface TextToSpeakOptions {
    lang?: string;
    pitch?: number;
    rate?: number;
    volume?: number;
    voiceName?: string;
    onStart?: () => void;
    onEnd?: () => void;
    onPause?: () => void;
    onResume?: () => void;
    onError?: (error: SpeechSynthesisErrorEvent) => void;
}

interface TextToSpeakResult {
    speak: () => void;
    pause: () => void;
    resume: () => void;
    stop: () => void;
    voices: SpeechSynthesisVoice[];
    isReady: boolean;
    status: 'idle' | 'speaking' | 'paused' | 'stopped';
}

export const useTextToSpeak = (text: string, options: TextToSpeakOptions = {}): TextToSpeakResult => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [isReady, setIsReady] = useState(false);
    const [status, setStatus] = useState<'idle' | 'speaking' | 'paused' | 'stopped'>('idle');
    const [currentUtterance, setCurrentUtterance] = useState<SpeechSynthesisUtterance | null>(null);

    const initSpeechSynthesis = useCallback(() => {
        if (!window.speechSynthesis) {
            console.error('Speech Synthesis API is not supported in this browser.');
            return;
        }

        const updateVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);
        };

        updateVoices();
        window.speechSynthesis.onvoiceschanged = updateVoices;

        setIsReady(true);

        return () => {
            window.speechSynthesis.onvoiceschanged = null;
        };
    }, []);

    useEffect(() => {
        initSpeechSynthesis();
    }, [initSpeechSynthesis]);

    const speak = useCallback(() => {
        if (!isReady) {
            console.warn('Speech Synthesis is not ready yet. Please wait for initialization.');
            return;
        }

        if (!text) {
            console.warn('No text provided to speak.');
            return;
        }

        if (currentUtterance) {
            console.warn('Speech is already in progress. Call stop() to interrupt.');
            return;
        }

        const utterance = new SpeechSynthesisUtterance(text);

        const { lang = 'en-US', pitch = 1, rate = 1, volume = 1, voiceName, onStart, onEnd, onPause, onResume, onError } = options;

        utterance.lang = lang;
        utterance.pitch = pitch;
        utterance.rate = rate;
        utterance.volume = volume;

        const selectedVoice = voiceName ? voices.find((voice) => voice.name.includes(voiceName)) : null;
        utterance.voice = selectedVoice || voices[0];

        if (onStart) utterance.addEventListener('start', onStart);
        if (onEnd) utterance.addEventListener('end', onEnd);
        if (onPause) utterance.addEventListener('pause', onPause);
        if (onResume) utterance.addEventListener('resume', onResume);
        if (onError) utterance.addEventListener('error', onError);

        setCurrentUtterance(utterance);
        setStatus('speaking');
        window.speechSynthesis.speak(utterance);

        return () => {
            if (onStart) utterance.removeEventListener('start', onStart);
            if (onEnd) utterance.removeEventListener('end', onEnd);
            if (onPause) utterance.removeEventListener('pause', onPause);
            if (onResume) utterance.removeEventListener('resume', onResume);
            if (onError) utterance.removeEventListener('error', onError);
            setCurrentUtterance(null);
            setStatus('stopped');
        };
    }, [isReady, text, voices, options, currentUtterance]);

    const pause = useCallback(() => {
        if (currentUtterance) {
            window.speechSynthesis.pause();
            setStatus('paused');
        }
    }, [currentUtterance]);

    const resume = useCallback(() => {
        if (currentUtterance) {
            window.speechSynthesis.resume();
            setStatus('speaking');
        }
    }, [currentUtterance]);

    const stop = useCallback(() => {
        if (currentUtterance) {
            window.speechSynthesis.cancel();
            setCurrentUtterance(null);
            setStatus('stopped');
        }
    }, [currentUtterance]);

    return { speak, pause, resume, stop, voices, isReady, status };
};
