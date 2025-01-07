import OpenAI from 'openai';
import { createApi } from 'unsplash-js';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const unsplash = createApi({
  accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY
});

export async function generateSlideContent(prompt: string) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a presentation slide creator. Create concise, impactful slide content based on the user's input."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    model: "gpt-3.5-turbo",
  });

  const slideText = completion.choices[0].message.content || '';
  
  // Get relevant image from Unsplash
  const searchResults = await unsplash.search.getPhotos({
    query: prompt,
    perPage: 1,
  });

  const imageUrl = searchResults.response?.results[0]?.urls.regular;

  return {
    text: slideText,
    imageUrl
  };
}