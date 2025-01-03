import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

interface GenerateDataParams {
  prompt: string;
  rows: number;
}

export async function generateData({ prompt, rows }: GenerateDataParams): Promise<string> {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant that generates CSV data based on user requirements. Always return valid CSV format with headers."
      },
      {
        role: "user",
        content: `Generate ${rows} rows of CSV data for the following requirement: ${prompt}`
      }
    ]
  });

  return completion.choices[0].message.content || '';
}