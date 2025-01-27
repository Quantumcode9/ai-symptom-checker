import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
try {
    const { question, chatHistory, conditions, age, gender, doctorsNotes } = await req.json();

    let prompt = `You are an AI medical assistant providing follow-up information on a possible diagnosis.
    
### Patient Info:
- Age: ${age}
- Gender: ${gender}
- Doctor's Notes: ${doctorsNotes}

### Possible Diagnoses:
${conditions.map((c, i) => `${i + 1}. ${c.name} (Severity: ${c.severity}) - ${c.description}`).join("\n")}

### Conversation History:
${chatHistory.map((m) => `${m.role}: ${m.content}`).join("\n")}

### Follow-Up Question:
User: ${question}

### Guidelines:
- Treat all conditions as **possible** diagnoses, not confirmed ones.
- Provide answers using **conditional language** (e.g., *"If you have [condition], you may experience..."*).
- If the question suggests new symptoms, update the possible conditions.
- Highlight a condition if the question suggests a high-risk situation.
- Format your response as JSON:

{
"answer": "your detailed response",
"newConditions": [ { "name": "Condition Name", "description": "Brief details", "severity": "Low/Mild/Moderate/High" } ],
"updatedConditions": [ { "name": "Existing Condition", "update": "What changed?" } ],
"highlightCondition": "Condition Name (if important)"
}`;

    const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'system', content: prompt }],
    temperature: 0.6,
    max_tokens: 500,
    });

    const parsedResponse = JSON.parse(response.choices[0].message.content);

    return NextResponse.json({
    answer: parsedResponse.answer || "I couldn't determine an answer.",
    newConditions: parsedResponse.newConditions || [],
    updatedConditions: parsedResponse.updatedConditions || [],
    highlightCondition: parsedResponse.highlightCondition || null,
    });

} catch (error) {
    console.error('Follow-Up API Error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
}
}