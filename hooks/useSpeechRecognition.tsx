// import { useEffect, useState } from 'react';

// interface SpeechToTextHook {
//   transcript: string;
//   isListening: boolean;
//   startListening: () => void;
//   stopListening: () => void;
// }

// export const useSpeechRecognition = (): SpeechToTextHook => {
//   const [transcript, setTranscript] = useState<string>('');
//   const [isListening, setIsListening] = useState<boolean>(false);
//   const recognition =new ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)()||null;

//   useEffect(() => {
//     recognition.lang = 'en-US';
//     recognition.onresult = (event: any) => {
//       const result = event.results[event.results.length - 1];
//       const text = result[0].transcript;
//       setTranscript((prevTranscript) => prevTranscript + ' ' + text);
//     };

//     recognition.onend = () => {
//       if (isListening) {
//         const trimmedWord = transcript.trim();
//         console.log(trimmedWord)
//         // You can perform additional processing here if needed
//         setIsListening(true);

//       }
//     };

//     return () => {
//       recognition.stop();
//     };
//   }, [isListening, transcript]);

//   const startListening = () => {
//     recognition.start();
//     setIsListening(true);
//   };

//   const stopListening = async () => {
//     recognition.stop();
//     setIsListening(false);
//   };
//   console.log(transcript)

//   return {
//     transcript,
//     isListening,
//     startListening,
//     stopListening,
//   };
// };

import { useEffect, useState, useRef } from "react";
type SpeechRecognitionType =
  | typeof window.SpeechRecognition
  | typeof window.webkitSpeechRecognition;

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}
// Define the SpeechRecognition and SpeechRecognitionEvent types
type SpeechRecognition = {
  new (): SpeechRecognitionInstance;
};

interface SpeechRecognitionInstance {
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onend: () => void;
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  length: number;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechToTextHook {
  transcript: string;
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
}

export const useSpeechRecognition = (): SpeechToTextHook => {
  const [transcript, setTranscript] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);
  const recognitionRef = useRef<InstanceType<SpeechRecognitionType> | null>(
    null
  );

  useEffect(() => {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = "en-US";
    } else {
      console.error("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = recognitionRef.current;

    if (recognition) {
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const result = event.results[event.results.length - 1];
        const text = result[0].transcript;
        setTranscript((prevTranscript) => prevTranscript + " " + text);
      };

      recognition.onend = () => {
        if (isListening) {
          const trimmedWord = transcript.trim();
          console.log(trimmedWord);
          // Perform additional processing if needed
          setIsListening(true);
        }
      };
    }

    return () => {
      recognition?.stop();
    };
  }, [isListening, transcript]);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsListening(true);
    } else {
      console.error("Speech recognition is not initialized.");
    }
  };

  const stopListening = async () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      console.error("Speech recognition is not initialized.");
    }
  };

  return {
    transcript,
    isListening,
    startListening,
    stopListening,
  };
};
