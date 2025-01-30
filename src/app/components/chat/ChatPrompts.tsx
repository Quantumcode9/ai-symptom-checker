
import React from 'react';

interface ChatPromptsProps {
prompts: string[];
onPromptClick: (prompt: string) => void;
isLoading: boolean;

}

const ChatPrompts: React.FC<ChatPromptsProps> = ({ prompts, onPromptClick, isLoading }) => {
if (!prompts?.length) return null;

return (
    <div className="flex flex-wrap gap-3 mb-2 px-2 max-w-2xl">
    {prompts.map((prompt, index) => (
        <button
        key={index}
        onClick={() => onPromptClick(prompt)}
        disabled={isLoading}
        className="px-2 py-2 text-left bg-header text-white rounded-lg hover:bg-blue-400
        transition-all duration-300 ease-in-out disabled:opacity-50 
        shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
        >
        {prompt}
        </button>
    ))}
    </div>
);
};

export default ChatPrompts;