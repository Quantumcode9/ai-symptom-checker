import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader } from 'lucide-react';
import { selectNurse } from '../utils/nurseUtils';
import ReactMarkdown from 'react-markdown';
import ChatPrompts from './chat/ChatPrompts';
import { handleSubmit } from '../hooks/handleSubmit';


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
    const [suggestedPrompts, setSuggestedPrompts] = useState([]);


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


  const handlePromptClick = (prompt) => {
    setInputValue(prompt);
    handleSubmit(new Event('submit'));
  };

  
    // // Save chat history 
    // useEffect(() => {
    //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
    // }, [messages]);
  

    // Scroll to the bottom of the chat

    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    , [messages]);
  
 


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
                  {/* Render message content as Markdown */}
              <div className="text-sm">
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
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

        {/* Action Bar */}
  <div className="sticky bottom-0 bg-betterGray p-2 rounded-t-lg shadow-lg">

  {!isLoading && suggestedPrompts.length > 0 && (
      <ChatPrompts 
      prompts={suggestedPrompts} 
      onPromptClick={handlePromptClick} 
      isLoading={false}
    />
    )}
  </div>
    

    {/* Input Form */}
    <form onSubmit={handleSubmit} className="p-4 bg-background border-t">
        
      
    <div className="flex space-x-2">
      <textarea
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 p-2 border bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        disabled={isLoading}
        rows={2}
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