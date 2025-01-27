import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
apiKey: process.env.OPENAI_API_KEY,
});


// Helper function to estimate token count
function countTokens(text) {
    return Math.ceil(text.length / 4);
}

// Trims the history to fit within a specified token limit
function trimHistory(history, maxTokens) {
    let tokensUsed = 0;
    const trimmedHistory = [];

    for (let i = history.length - 1; i >= 0; i--) {
        const message = history[i];
        const messageTokens = countTokens(message.content);

        if (tokensUsed + messageTokens > maxTokens) break;

        trimmedHistory.unshift(message);
        tokensUsed += messageTokens;
    }

    return trimmedHistory;
}


function extractGatheredInfo(history) {
    const gathered = new Set();

    for (const message of history) {
        if (message.role === "assistant") {
            if (message.content.includes("severe") || message.content.includes("mild")) {
                gathered.add("severity");
            }
            if (message.content.match(/\b(days?|weeks?)\b/)) {
                gathered.add("duration");
            }
            if (message.content.includes("medication") || message.content.includes("recent changes")) {
                gathered.add("medications");
                gathered.add("recent changes");
            }
        }
    }
    return Array.from(gathered);
}



export async function POST(request) {
    try {
    const {
        history = [],
        userInput,
        symptoms,
        medicalHistory,
        otherSymptoms,
        age,
        gender,
        lifestyle,
        conditions, 
    } = await request.json();

    const updatedHistory = [
        ...history,
        {
        role: 'user',
        content: userInput,
        },
    ];

    // 2. Trim the updated conversation
    const finalHistory = trimHistory(updatedHistory, 1500);
    const requiredInfo = ["severity", "duration", "recent changes", "medications"];
    const gatheredInfo = extractGatheredInfo(history);


    
        const response = await openai.chat.completions.create({
            
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: `You are Nurse Sarah, a friendly AI nurse assistant. 
                    - Your role is **not** to diagnose the user.
                    - If the user has **not** been diagnosed yet, ask about symptoms and guide them to the doctor via the diagnose button.
                    - Only provide general health information. Do not assume a diagnosis.
                        ## Current Patient: 
            - Age: ${age}
            - Gender: ${gender}
            - Symptoms: ${JSON.stringify(symptoms)}
            - Medical History: ${medicalHistory}
    
            ## Information Goals: 
            - Identify: Severity and duration of symptoms.
            - Ask: Recent changes in health or medications.
            - Determine: If emergency care is needed.
            - Ensure: All relevant history is gathered before summarizing.

            **Track Progress:**
            - Information still needed: ${JSON.stringify(requiredInfo.filter(i => !gatheredInfo.includes(i)))}
            - If all key details are gathered, summarize and conclude.


            - If the user has **diagnosed conditions**, answer follow-up questions and provide general health guidance.


### Possible Diagnosed Conditions:
${conditions.length > 0 ? conditions.map((c, i) => `${i + 1}. ${c.name} (Severity: ${c.severity})`).join("\n") : "None yet"}

### Conversation History:
${history.map((m) => `${m.role}: ${m.content}`).join("\n")}

            **Respond in JSON format:**
            {
                "message": "your response",
                "doctorsNotes": "medical summary"
            }`
        },
        ...trimHistory(history, 1500)
    ],
    temperature: 0.7,
            response_format: { type: "json_object" }
        });
        console.log('response:', response, 'history:', history, 'userInput:', userInput, 'symptoms:', symptoms, 'medicalHistory:', medicalHistory, 'otherSymptoms:', otherSymptoms, 'age:', age);
        const parsedResponse = JSON.parse(response.choices[0].message.content);
        console.log('OpenAI raw content:', response.choices[0].message.content);

        return NextResponse.json({
        // 4. The new 'assistant' message is appended for the client
        messages: [
            ...updatedHistory,
            { role: 'assistant', content: parsedResponse.message },
        ],
        doctorsNotes: parsedResponse.doctorsNotes,
        });
    } catch (error) {
        console.error('Error:', error);
        return new NextResponse('Error processing request', { status: 500 });
    }
    }