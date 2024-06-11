// import OpenAI from "openai";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// const generationConfig = {
//   stopSequences: ["red"],
//   maxOutputTokens: 200,
//   temperature: 0.9,
//   topP: 0.1,
//   topK: 16,
// };
// export class OPENAI {
//   private openapi: string | undefined;
//   private model: string;
//   private openai: OpenAI | null;
//   private genAI: any;
//   constructor() {
//     this.openapi = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
//     this.model = "gpt-3.5-turbo";
//     this.openai = null;
//     console.log(this.openapi);
//     this.genAI = new GoogleGenerativeAI(
//       process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
//     );

//     if (!this.openapi) {
//       throw new Error("OpenAI API key is missing");
//     } else {
//       this.initializeOpenAI();
//     }
//   }
//   async geminitest() {
//     const model = this.genAI.getGenerativeModel({
//       model: "gemini-1.5-flash",
//       generationConfig,
//     });

//     const prompt = "Write a story about a magic backpack.";

//     const result = await model.generateContentStream([prompt]);
//     let text = "";
//     for await (const chunk of result.stream) {
//       const chunkText = chunk.text();
//       console.log(chunkText);
//       text += chunkText;
//     }
//   }

//   private initializeOpenAI() {
//     try {
//       this.openai = new OpenAI({
//         apiKey: this.openapi,
//         dangerouslyAllowBrowser: true,
//       });
//     } catch (err) {
//       throw new Error(`Error initializing OpenAI: ${err}`);
//     }
//   }

//   public isInitialized(): boolean {
//     return !!this.openai;
//   }

//   public async generateText(
//     message: string,
//     onDataChunk: (chunk: string) => void
//   ): Promise<{ status: boolean; result: any }> {
//     try {
//       if (!this.openai) {
//         throw new Error("OpenAI client not initialized");
//       }
//       let completeResponse = "";
//       const stream = this.openai.beta.chat.completions.stream({
//         model: this.model,
//         messages: [{ role: "user", content: message }],
//         stream: true,
//       });

//       return new Promise((resolve, reject) => {
//         stream.on("content", (delta) => {
//           if (delta) {
//             onDataChunk(delta);
//             completeResponse += delta;
//           } else {
//             console.error("Invalid or empty response from OpenAI API");
//           }
//         });
//         stream.on("error", (err) => {
//           console.error(`Error in stream: ${err.message}`);
//           reject({ status: false, result: err.message });
//         });

//         stream.on("end", () => {
//           console.log("Stream Complete");
//           resolve({ status: true, result: completeResponse });
//         });
//       });
//     } catch (err) {
//       console.error(`Error in generateText: ${err}`);
//       return { status: false, result: err };
//     }
//   }
// }


import { GoogleGenerativeAI } from "@google/generative-ai";

const generationConfig = {
  stopSequences: ["red"],
  maxOutputTokens: 200,
  temperature: 0.9,
  topP: 0.1,
  topK: 16,
};

export class GenerativeAI {
  private genAI: GoogleGenerativeAI;

  constructor() {
    const geminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!geminiApiKey) {
      throw new Error("Gemini API key is missing");
    }

    this.genAI = new GoogleGenerativeAI(geminiApiKey);
  }

  public async generateText(
    prompt: string,
    onDataChunk: (chunk: string) => void
  ): Promise<{ status: boolean; result: string }> {
    try {
      const model = this.genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig,
      });

      const result = await model.generateContentStream([prompt]);
      let completeResponse = "";

      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        console.log(chunkText);
        onDataChunk(chunkText);
        completeResponse += chunkText;
      }

      return { status: true, result: completeResponse };
    } catch (err:any) {
      console.error(`Error in generateText: ${err}`);
      return { status: false, result: err };
    }
  }
}
