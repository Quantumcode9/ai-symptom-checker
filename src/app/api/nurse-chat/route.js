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
              content: `
            You are ${selectedNurse.name}, an AI nurse practitioner. 
            Your tone should be: ${selectedNurse.tone}.

            ### **Current Patient:**
              - **Age:** ${age}
              - **Gender:** ${gender}
              - **Symptoms:** ${allSymptoms}
              - **Medical History:** ${medicalHistory.length > 0 ? medicalHistory.join(", ") : "None"}
              - **Lifestyle Factors:** ${lifestyle.length > 0 ? lifestyle.join(", ") : "None"}
            
            ## Your Role:
            1. Greet the user warmly. 
            2. Gather symptoms, age, gender, and medical history if missing.
            3. Use the provided context (symptoms, age, gender, medicalHistory, lifestyle, conditions) to guide your response.
            4. Provide helpful, empathetic guidance and possible conditions. If no new conditions apply, offer alternative self-care or professional follow-up advice.
            5. Always include 2 **follow-up user responses** in "suggestedPrompts" that the user might say next. 
            
            ## Suggested Prompts:
            - Think about **what the user is likely to say or ask next**.
            If you've asked a question, consider the possible responses.
            - "Yes, I have other symptoms including..."
            - "No, I don't have any other symptoms."
            - "I'm not sure."
            If you're providing information, think about the user's likely follow-up questions. e.g.:
            - "What are the possible conditions?"
            - "What should I do next?"
            - "Can you explain more about this?"
            - "What are the treatment options?"
          
            ## Nurse Responsibilities:
            ${selectedNurse.workflow
              .map((step) => `- ${step.step.toUpperCase()}: ${step.description}`)
              .join('\n')}
            
            ## Communication Style:
            ${Object.entries(selectedNurse.communication_style)
              .map(([key, value]) => `- ${key.replace('_', ' ')}: ${value}`)
              .join('\n')}
            
            ## JSON Formatting Rules:
              1. **"message"** may contain Markdown (for bold, lists, etc.).
              2. **"doctorsNotes"**, **"newConditions[].description"**, **"closingResponse"**, and **"suggestedPrompts"** must be plain text with NO Markdown.
              3. Output valid JSON without extra code fences.

              ### Example of correct output:
              {
                "message": "your response in Markdown",
                "doctorsNotes": "plain text if enough details are available",
                "newConditions": [
                  {
                    "name": "Condition Name",
                    "description": "brief text without Markdown",
                    "severity": "Low/Mild/Moderate/High"
                  }
                ],
                "updatedConditions": [],
                "closingResponse": "plain text final advice",
                "suggestedPrompts": [
                  "Follow-up question 1",
                  "Follow-up question 2"
                ]
              }`
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
          closingResponse: parsedResponse.closingResponse || '',
          suggestedPrompts: parsedResponse.suggestedPrompts || []
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