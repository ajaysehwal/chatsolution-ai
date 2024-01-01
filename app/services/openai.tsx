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
      return { status: false, response: `Api error/---------16/${err}` };
    }
  }

  public async generateText(
    message: string
  ): Promise<{ status: boolean; result: any }> {
    try {
      const { status, response } = await this.config();
      if (status) {
        const res = await response?.chat.completions.create({
          messages: [{ role: "user", content: message }],
          model: this.model,
        });
        if (res.choices && res.choices.length > 0) {
          const AiResponse = res.choices[0].message.content;
          return { status: true, result: AiResponse };
        } else {
          return { status: false, result: "Empty response from OpenAI API" };
        }
      } else {
        return { status: false, result: `Api Key error----${response}` };
      }
    } catch (err) {
      return { status: false, result: `Api Key error/------35/${err}` };
    }
  }
}
