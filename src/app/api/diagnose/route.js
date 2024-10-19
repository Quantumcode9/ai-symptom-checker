import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { symptoms, otherSymptoms, age, gender } = await req.json();

    const symptomsWithBodyParts = symptoms.map(item => `${item.bodyPart}: ${item.symptom}`).join(', ');

    const allSymptoms = otherSymptoms.trim()
      ? `${symptomsWithBodyParts}, ${otherSymptoms}`
      : symptomsWithBodyParts;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a medical assistant. The user will provide symptoms along with the associated body parts, patient age, gender, and relevant medical history.

Your task is to:
- Provide an opening response personalized to the user's input.
- Prioritize common, less severe conditions, especially for younger users, before listing more severe possibilities.
- List the top 4 possible conditions, ranked by likelihood.
- For each condition, provide:
  - **Name**: The name of the condition.
  - **Description**: A brief explanation.
  - **Severity**: One of Low, Mild, Moderate, High.
- Conclude with a personalized closing recommendation that includes actionable advice, and encourages the user to seek professional medical advice if symptoms persist or worsen, without causing undue alarm.

Format your response exactly like this:
[Opening Response]

Condition 1:
Name: [Condition Name]
Description: [Description]
Severity: [Severity]

Condition 2:
Name: [Condition Name]
Description: [Description]
Severity: [Severity]

Condition 3:
...

[Closing recommendation]`, 
        },
        {
          role: 'user',
          content: `Hello, I have the following symptoms: ${allSymptoms}. I am ${age} years old and ${gender}.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 550,
    });

    const choices = response.choices;
    if (!choices || choices.length === 0) {
      throw new Error('No choices returned from OpenAI API');
    }

    const content = choices[0].message.content.trim();

    // parse the response
    const sections = content.split(/\n\n+/);
    const openingResponse = sections.shift();
    const closingResponse = sections.pop();

    const conditions = sections.map((section) => {
      const lines = section.split('\n');
      const nameLine = lines.find(line => line.startsWith('Name:'));
      const descriptionLine = lines.find(line => line.startsWith('Description:'));
      const severityLine = lines.find(line => line.startsWith('Severity:'));

      return {
        name: nameLine ? nameLine.replace('Name:', '').trim() : '',
        description: descriptionLine ? descriptionLine.replace('Description:', '').trim() : '',
        severity: severityLine ? severityLine.replace('Severity:', '').trim() : '',
      };
    });

    return NextResponse.json({ openingResponse, conditions, closingResponse });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}