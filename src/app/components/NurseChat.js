import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader } from 'lucide-react';
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
    setMessages, 
    messages, 
    onMessagesUpdate,
  }) => {
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
  

    useEffect(() => {
      if (messages.length === 0) {
        setMessages([
          {
            id: '1',
            role: 'assistant',
            content: "Hello, I'm Nurse Sarah. I'll be helping gather some information about your health before we proceed with the symptom checker. Could you start by telling me what brings you in today?",
            timestamp: new Date()
          }
        ]);
      }
    }, [messages, setMessages]);
  
    // // Save chat history 
    // useEffect(() => {
    //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
    // }, [messages]);
  


    useEffect(() => {
      if (onLoadingChange) {
        onLoadingChange(isLoading);
      }
    }, [isLoading, onLoadingChange]);
  
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
  
    useEffect(() => {
      scrollToBottom();
    }, [messages]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!inputValue.trim()) return;
  
      const newUserMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: inputValue,
        timestamp: new Date()
      };
  
      const updatedHistory = [...messages, newUserMessage];
      onMessagesUpdate(updatedHistory);
      setInputValue('');
      setInputValue('');
      setIsLoading(true);
  
  
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
            history: updatedHistory,
            conditions, 
            isFirstMessage: messages.length === 1,
          }),
        });
  
        const data = await response.json();

        
        const newAssistantMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.messages[data.messages.length - 1].content,
          timestamp: new Date()
        };
  
        onMessagesUpdate([...updatedHistory, newAssistantMessage]);
        
      if (data.doctorsNotes) {
        onUpdateNotes?.(data.doctorsNotes);
      }
  
    } catch (error) {
      console.error('Error:', error);
      onMessagesUpdate([
        ...updatedHistory,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: "I apologize, but I'm having trouble connecting right now. Could you please try again?",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
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
                    {new Date(message.timestamp).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit'
                    })}
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