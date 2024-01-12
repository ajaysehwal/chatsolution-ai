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
        throw new Error("OpenAI API key is missing");
      }
  
      this.initializeOpenAI();
    }
  
    private initializeOpenAI() {
      try {
        this.openai = new OpenAI({
          apiKey: this.openapi,
          dangerouslyAllowBrowser: true,
        });
      } catch (err) {
        throw new Error(`Error initializing OpenAI: ${err}`);
      }
    }
  
    public async generateText(message: string): Promise<{ status: boolean; result: any }> {
      try {
        if (!this.openai) {
          throw new Error("OpenAI client not initialized");
        }
  
        const stream = this.openai.beta.chat.completions.stream({
          model: this.model,
          messages: [{ role: "user", content: message }],
          stream: true,
        });
  
        const chatCompletion = await stream.finalChatCompletion();
        console.log("Chat Completion:", chatCompletion);
  
        if (chatCompletion.choices && chatCompletion.choices.length > 0) {
          const aiResponse = chatCompletion.choices[0].message.content;
          return { status: true, result: aiResponse };
        } else {
          return { status: false, result: "Empty response from OpenAI API" };
        }
      } catch (err) {
        return { status: false, result: `Error in generateText: ${err}` };
      }
    }
  }
  

