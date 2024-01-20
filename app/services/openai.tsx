import OpenAI from "openai";

export class OPENAI {
  private openapi: string;
  private model: string;
  private openai: OpenAI | null;

  constructor() {
    this.openapi = process.env.NEXT_PUBLIC_OPENAI_API_KEY || "";
    this.model = "gpt-3.5-turbo";
    this.openai = null;

    if (!this.openapi) {
      console.error("OpenAI API key is missing");
    } else {
      this.initializeOpenAI();
    }
  }

  private initializeOpenAI() {
    try {
      this.openai = new OpenAI({
        apiKey: this.openapi,
        dangerouslyAllowBrowser: true,
      });
    } catch (err) {
      console.error(`Error initializing OpenAI: ${err}`);
    }
  }

  public isInitialized(): boolean {
    return !!this.openai;
  }

  public async generateText(message: string, onDataChunk: (chunk: string) => void): Promise<{ status: boolean; result: any }> {
    try {
      if (!this.openai) {
        throw new Error("OpenAI client not initialized");
      }
      let completeResponse = ""
      const stream = this.openai.beta.chat.completions.stream({
        model: this.model,
        messages: [{ role: "user", content: message }],
        stream: true,
      });

      return new Promise((resolve, reject) => { 
        stream.on("content", (delta) => {
         if (delta) {
            onDataChunk(delta);
            completeResponse+=delta
          } else {
            console.error("Invalid or empty response from OpenAI API");
          }
        });
        stream.on("error", (err) => {
          console.error(`Error in stream: ${err.message}`);
          reject({ status: false, result: err.message });
        });

        stream.on("end" , () => {
          console.log("Stream Complete");
          resolve({ status: true, result: completeResponse });
        });
      });
    } catch (err) {
      console.error(`Error in generateText: ${err}`);
      return { status: false, result: err };
    }
  }
}


