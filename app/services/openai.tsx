import OpenAI from "openai";
export class OPENAI {
  private openapi: string;
  private model: string;
  constructor() {
    this.openapi = `${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`;
    this.model = "gpt-3.5-turbo";
  }
  private async config(): Promise<{ status: boolean; response: any }> {
    try {
      const openai = new OpenAI({
        apiKey: this.openapi,
        dangerouslyAllowBrowser: true,
      });
      return { status: true, response: openai };
    } catch (err) {
      return { status: false, response: `Api error/---------17/${err}` };
    }
  }

  public async generateText(
    message: string
  ): Promise<{ status: boolean; result: any }> {
    try {
      const { status, response } = await this.config();
      if (status) {
        const stream = await response?.beta.chat.completions.stream({
          model: this.model,
          messages: [{ role: "user", content: message }],
          stream: true,
        });
        stream.on("content", (delta: any, snapshot: any)=>{

        });
        const chatCompletion = await stream.finalChatCompletion();
        console.log(chatCompletion);

        if (chatCompletion.choices && chatCompletion.choices.length > 0) {
          const AiResponse = chatCompletion.choices[0].message.content;
          return { status: true, result: AiResponse };
        } else {
          return { status: false, result: "Empty response from OpenAI API" };
        }
      } else {
        return { status: false, result: `Api Key error----${response}` };
      }
    } catch (err) {
      return { status: false, result: `Api Key error/------48/${err}` };
    }
  }
}
