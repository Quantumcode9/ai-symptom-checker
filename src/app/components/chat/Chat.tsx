'use client';

import React, { useState, useEffect } from 'react';
import { ResizableBox, ResizeHandleAxis } from 'react-resizable';
import 'react-resizable/css/styles.css';
import styles from './Chatbot.module.css';
import NurseChat from '../NurseChat';
import AnimatedBotIcon from './AnimatedBotIcon'; 
import { selectNurse } from '../../utils/nurseUtils';

const LOCAL_STORAGE_KEY = 'nurseChatHistory';

interface SectionData {
  question: string;
  answer: string;
}

interface ChatbotProps {
  populateFields?: (fields: Record<string, string>) => void;
  context?: string;
  onUpdateNotes: (notes: string) => void;
  otherSymptoms: string;
  symptoms?: any[];
  plotData?: any[];
  age?: string;
  gender?: string;
  lifestyle?: any;
  userInput?: {
    name?: string;
    responses?: string[];
    answers?: string[];
  };
  selectedSections?: SectionData[];
  medicalHistory: string;
  conditions: string;
  setConditions: (conditions: string) => void;
  closingResponse: string;
  setClosingResponse: (closingResponse: string) => void;
}

const Chatbot: React.FC<ChatbotProps> = ({
  context,
  onUpdateNotes,
  age,
  otherSymptoms,
  symptoms,
  gender,
  userInput,
  medicalHistory,
  lifestyle,
  conditions,
  setConditions,
  closingResponse,
  setClosingResponse,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState([]);
  const userData = { age, symptoms };
  const nurse = selectNurse(userData);

  useEffect(() => {
    // Load previous chat history
    const savedHistory = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedHistory) {
      setMessages(JSON.parse(savedHistory));
    }
  }, [isOpen]); // when chat window opens

  useEffect(() => {
    // Save chat history whenever it updates
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      const initialMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: `Hello, I'm ${nurse.name}. I'll be helping gather some information about your health before we proceed with the symptom checker. Could you start by telling me what brings you in today?`,
        timestamp: new Date().toISOString(),
      };
      setMessages([initialMessage]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMessagesUpdate = (newMessages) => {
    setMessages(newMessages);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newMessages));
  };
  


  const toggleChat = () => setIsOpen(!isOpen);
  const toggleFullScreen = () => setIsFullScreen(!isFullScreen);

  const handleLoadingChange = (loading: boolean) => {
    setIsLoading(loading);
  };


  return (
    <div className={styles.chatbot}>
      {/* Chat Icon */}
      <div 
        className={`${styles.chatbotIcon} ${isOpen ? styles.hidden : ''}`} 
        onClick={toggleChat}
        role="button"
        aria-label="Open chat"
      >
    <span className={styles.chatIcon}>
    <AnimatedBotIcon size={45} />
  </span>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <ResizableBox
          axis="both"
          handleSize={[20, 20]}
          resizeHandles={['nw', 'n'] as ResizeHandleAxis[]}
          width={isFullScreen ? window.innerWidth : 400}
          height={isFullScreen ? window.innerHeight : 500}
          minConstraints={[300, 400]}
          maxConstraints={[window.innerWidth, window.innerHeight]}
          className={`${styles.chatbotWindow} ${isFullScreen ? styles.fullScreen : ''}`}
          draggableOpts={{ disabled: isFullScreen }}
        >
          {/* Header */}
          <div className={styles.chatHeader}>
          <div className="w-8 h-8 mr-2 rounded-full bg-header flex items-center justify-center">
          <AnimatedBotIcon size={45} isLoading={isLoading} />
      </div>
            <h4 className="text-lg font-semibold">Medical Assistant</h4>
            <div className="flex items-center gap-2">
              <button 
                className={styles.fullScreenButton}
                onClick={toggleFullScreen}
                aria-label={isFullScreen ? 'Exit full screen' : 'Enter full screen'}
              >
       
              </button>
              <button 
                className={styles.closeChat}
                onClick={toggleChat}
                aria-label="Close chat"
              >
                ✖
              </button>
            </div>
          </div>

          {/* Chat Content */}
          <div className={styles.chatContent}>
          <NurseChat
              onUpdateNotes={onUpdateNotes}
              context={context}
              userInput={userInput}
              onLoadingChange={handleLoadingChange}
              symptoms={symptoms}
              age={age}
              gender={gender}
              closingResponse={closingResponse}
              setClosingResponse={setClosingResponse} 
              medicalHistory={medicalHistory}
              otherSymptoms={otherSymptoms}
              lifestyle={lifestyle}
              conditions={conditions}
              setConditions={setConditions}
              messages={messages} 
              setMessages={setMessages} 
              onMessagesUpdate={handleMessagesUpdate} 
            />
          </div>
        </ResizableBox>
      )}
    </div>
  );
};

export default Chatbot;