import React from 'react';

interface ChatPromptsProps {
currentComponent: string;
onPromptClick: (prompt: string) => void;
}

const ChatPrompts: React.FC<ChatPromptsProps> = ({ currentComponent, onPromptClick }) => {
const getPrompts = () => {
    switch (currentComponent) {
    case 'default':
        return [
        'Having the these symptoms',
        'I am feeling unwell',
        ];
    }
};

return (
    <div className="flex flex-wrap gap-2 mb-4">
    {getPrompts().map((prompt, index) => (
        <button
        key={index}
        onClick={() => onPromptClick(prompt)}
        className="px-4 py-2 bg-header text-white rounded-lg hover:bg-accent transition-colors duration-300"
        >
        {prompt}
        </button>
    ))}
    </div>
);
};

export default ChatPrompts;