    import { NextResponse } from 'next/server';
    import OpenAI from 'openai';
    import { selectNurse } from '../../utils/nurseUtils';

    const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    });

    // Helper function to count tokens
    function countTokens(text) {
    return Math.ceil(text.length / 4);
    }

  




    // Trim chat history to fit within token limits
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

    export async function POST(request) {
    try {
        const  {
        history = [],
        userInput,
        symptoms = [],
        medicalHistory = [],
        otherSymptoms = "",
        age,
        gender,
        lifestyle = [],
        conditions = [],
        
        } = await request.json();

        

        console.log('symptoms:', symptoms);
        // Format symptoms into readable text
        const symptomsText = symptoms.map(item => `${item.bodyPart}: ${item.symptom}`).join(', ');
        const allSymptoms = otherSymptoms.trim()
        ? `${symptomsText}, ${otherSymptoms}`
        : symptomsText;

        const selectedNurse = selectNurse({ age, symptoms, gender });
        console.log(`👩‍⚕️ Assigned Nurse: ${selectedNurse.name}`);

  

        // Prepare the chat history
        const updatedHistory = [...history];

        const finalHistory = trimHistory(updatedHistory, 1500);

        // Generate a response from the AI
        const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            {
            role: 'system',
              content: `${selectedNurse.content}
        Your tone should be **${selectedNurse.tone}**.

           ### **Current Patient:**
        - **Age:** ${age}
        - **Gender:** ${gender}
        - **Symptoms:** ${allSymptoms}
        - **Medical History:** ${medicalHistory.length > 0 ? medicalHistory.join(", ") : "None"}
        - **Lifestyle Factors:** ${lifestyle.length > 0 ? lifestyle.join(", ") : "None"}


        ### **Your Responsibilities:**
        ${selectedNurse.workflow.map(step => `- ${step.step}: ${step.description}`).join("\n")}
        
        - Always prioritize the most **likely conditions** and rank them by **severity and relevance** to the user's symptoms.
        - Provide **actionable advice** and **next steps** for the user.
        - If no conditions match, provide **alternative guidance** instead of leaving the user without an answer.
        
        ---
        

        ---

        ### **Communication Style:**
        ${Object.entries(selectedNurse.communication_style)
          .map(([key, value]) => `- ${key.replace("_", " ")}: ${value}`)
          .join("\n")}

        ---

        ### **Possible Diagnoses:**
        ${conditions.length > 0 ? conditions.map((c, i) => `${i + 1}. ${c.name} (Severity: ${c.severity})`).join("\n") : "None yet If no conditions are found, provide a fallback response."}



        ### **Chat Response Formatting:**
- The chat should **not list full condition details**, but provide a **brief summary**.
- The **full breakdown** will be included in the patient’s summary.
- **Avoid** repeating the same information in multiple responses.



        ### **After Diagnosing Conditions:**
        - If the user asks a follow-up question, answer based on their conditions.
        - If needed, provide **doctor's notes summarizing symptoms and findings**.

        ---
        ### **Respond in JSON Format:**
        \\\json
        {
          "message": "your response",
          "doctorsNotes": "medical summary if enough details are available",
          "newConditions": [
            { "name": "Condition Name", "description": "Brief details", "severity": "Low/Mild/Moderate/High" }
          ],
          "updatedConditions": [
            { "name": "Existing Condition", "update": "What changed?" }
          ],
          "closingResponse": "Actionable closing advice for the user"
        }
        \\\
        `,
            },
            ...finalHistory,
        ],
        temperature: 0.7,
        max_tokens: 750,
        response_format: { type: "json_object" },

        });

        const parsedResponse = JSON.parse(response.choices[0].message.content);
        console.log(parsedResponse);

        return NextResponse.json({
        messages: [...updatedHistory, { role: 'assistant', content: parsedResponse.message }],
        doctorsNotes: parsedResponse.doctorsNotes || "",
        newConditions: parsedResponse.newConditions || [],
        updatedConditions: parsedResponse.updatedConditions || [],
        closingResponse: parsedResponse.closingResponse || ''
        });
    ;

      } catch (error) {
        console.error('API route error:', error);
        return NextResponse.json({ 
          error: 'Internal server error',
          details: error.message 
        }, { status: 500 });
      }
    }