import { useEffect, useState } from 'react';

interface SpeechToTextHook {
  transcript: string;
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
}

export const useSpeechRecognition = (): SpeechToTextHook => {
  const [transcript, setTranscript] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const recognition =new ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)()||null;

  useEffect(() => {
    recognition.lang = 'en-US';
    recognition.onresult = (event: any) => {
      const result = event.results[event.results.length - 1];
      const text = result[0].transcript;
      setTranscript((prevTranscript) => prevTranscript + ' ' + text);
    };

    recognition.onend = () => {
      if (isListening) {
        const trimmedWord = transcript.trim();
        console.log(trimmedWord)
        // You can perform additional processing here if needed
        setIsListening(true);

      }
    };

    return () => {
      recognition.stop();
    };
  }, [isListening, transcript]);

  const startListening = () => {
    recognition.start();
    setIsListening(true);
  };

  const stopListening = async () => {
    recognition.stop();
    setIsListening(false);
  };
  console.log(transcript)

  return {
    transcript,
    isListening,
    startListening,
    stopListening,
  };
};

