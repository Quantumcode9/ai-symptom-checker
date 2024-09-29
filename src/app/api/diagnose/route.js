import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { symptoms, age, gender } = await req.json();

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a medical assistant. The user will provide symptoms, along with patient age, gender, and relevant medical history. You will suggest the top 4 possible conditions, rank them based on likelihood, and provide a very brief explanation for each.',
        },
        {
          role: 'user',
          content: `Hello, I have the following symptoms: ${symptoms}. I am ${age} years old and ${gender}.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 250,
    });

    const choices = response.choices;
    if (!choices || choices.length === 0) {
      throw new Error('No choices returned from OpenAI API');
    }

    const content = choices[0].message.content.trim();
    const conditions = content.split('\n').map((condition) => condition.trim());

    return NextResponse.json({ conditions });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}