

const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
    id: crypto.randomUUID(),
    role: 'user',
    content: inputValue.trim(),
    timestamp: new Date().toISOString(),
    };
    
    const updatedMessages = [...messages, userMessage];

    // Let the parent do the actual "setMessages"
    onMessagesUpdate(updatedMessages);
    
    // Clear input
    setInputValue('');
    setIsLoading(true);
    onLoadingChange(true);


    try {
        const response = await fetch('/api/nurse-chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            context,
            age,
            otherSymptoms,
            symptoms,
            gender,
            userInput: inputValue,
            medicalHistory,
            lifestyle,
            history: updatedMessages,
            conditions, 
            updatedConditions,
            highlightCondition,
            openingResponse,
            closingResponse,
            isFirstMessage: messages.length === 1,
        }),
        });

        if (!response.ok) {

        throw new Error('Failed to fetch response from server');
        }


        const data = await response.json();

        if (!data.messages) {
        const errorMessage = {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: data.error || 'An error occurred. Please try again.',
            timestamp: new Date().toISOString(),
        };
        onMessagesUpdate([...updatedMessages, errorMessage]);
        return;
        }

        onMessagesUpdate(data.messages);
        
        if (data.doctorsNotes) {
        onUpdateNotes?.(data.doctorsNotes);
        }

        // Update Conditions
        if (data.newConditions.length > 0) {
        console.log('Setting new conditions:', data.newConditions);
        setConditions(data.newConditions); 
        }
    
        // Update Existing Conditions
        if (data.updatedConditions.length > 0) {
        setUpdatedConditions(data.updatedConditions);
        }
    
        // Highlight a specific condition if needed
        setHighlightCondition(data.highlightCondition);
    
        if (data.closingResponse) {
        setClosingResponse(data.closingResponse);
        }
    
        if (data.openingResponse) {
        setOpeningResponse(data.openingResponse);
        }
    
        if (data.suggestedPrompts?.length > 0) {
        setSuggestedPrompts(data.suggestedPrompts);
        }

    } catch (error) {
        console.error('Error:', error);
        const errorMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: "I apologize, but I'm having trouble connecting right now. Could you please try again?",
        timestamp: new Date().toISOString(),
        };
        onMessagesUpdate([...updatedMessages, errorMessage]);
    } finally {
        setIsLoading(false);
        onLoadingChange(false);
    }
    };