const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export async function generateCode(prompt: string): Promise<string> {
  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: import.meta.env.VITE_OPENAI_MODEL,
        messages: [
          {
            role: 'system',
            content: 'You are a helpful programming assistant. Generate only code without explanations.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: parseInt(import.meta.env.VITE_MAX_TOKENS),
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate code');
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating code:', error);
    throw error;
  }
}