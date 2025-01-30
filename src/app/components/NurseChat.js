import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader } from 'lucide-react';
import { selectNurse } from '../utils/nurseUtils';
// import ChatPrompts from './ChatPrompts';
const LOCAL_STORAGE_KEY = 'nurseChatHistory';

const NurseChat = ({
    onUpdateNotes, 
    context,
    age,
    otherSymptoms,
    symptoms,
    gender,
    userInput,
    medicalHistory,
    lifestyle,
    onLoadingChange, 
    conditions,
    setConditions,
    setMessages, 
    messages, 
    onMessagesUpdate,
    closingResponse,
    setClosingResponse,


  }) => {
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);


    const [openingResponse, setOpeningResponse] = useState('');
    const [updatedConditions, setUpdatedConditions] = useState([]);
    const [highlightCondition, setHighlightCondition] = useState('');


      // Format date helper
  const formatTimestamp = (timestamp) => {
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) {
        return new Date().toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit'
        });
      }
      return date.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Date formatting error:', error);
      return '';
    }
  };

  

  
    // // Save chat history 
    // useEffect(() => {
    //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
    // }, [messages]);
  

  
  
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


    return (
        <div className="flex flex-col h-full">
        {/* Messages Container */}
        <div className="flex-1 bg-background overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
            <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
                <div
                className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === 'user'
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}
                >
                <p className="text-sm">{message.content}</p>
                <span className="text-xs opacity-70 mt-1 block">
                {formatTimestamp(message.timestamp)}
                </span>
                </div>
            </div>
            ))}
            {isLoading && (
            <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg rounded-bl-none">
                <Loader className="w-4 h-4 animate-spin" />
                </div>
            </div>
            )}
            <div ref={messagesEndRef} />
        </div>
    
        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-4 bg-background border-t">
            <div className="flex space-x-2">
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
            />
            <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <Send className="w-5 h-5" />
            </button>
            </div>
        </form>
        </div>
    );
    };



export default NurseChat;