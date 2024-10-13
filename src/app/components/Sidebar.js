import React, { useEffect, useRef } from 'react';

const SymptomsSidebar = ({
bodyPart,
symptomsData,
onClose,
selectedSymptoms,
handleSymptomClick,
}) => {
const sidebarRef = useRef(null);

const bodyPartData = symptomsData.symptoms.find(
    (item) => item.name === bodyPart
);

const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
    onClose();
    }
};

useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
    document.removeEventListener('mousedown', handleClickOutside);
    };
}, []);

if (!bodyPartData) {
    return null;
}

return (
    <div
    ref={sidebarRef}
    className="fixed top-20 right-0 w-64 h-auto max-h-[70vh] bg-sideBar shadow-lg z-50 mb-10"
    >
    <div className="p-4">
        <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold mb-2">{bodyPartData.name}</h2>
        <button onClick={onClose} className="text-red-500">
            X
        </button>
        </div>
        <div className="overflow-y-auto max-h-[60vh]">
        <ul>
            {bodyPartData.symptoms
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((symptom) => {
                const isSelected = selectedSymptoms.some(
                (item) =>
                    item.symptom === symptom.name && item.bodyPart === bodyPart
                );
                return (
                <li
                    key={symptom.id}
                    className={`mb-2 p-2 cursor-pointer text-sm sm:text-base transition-colors duration-200 ease-in-out ${
                    isSelected
                        ? 'bg-blue-200 text-blue-800 font-semibold'
                        : 'bg-gray-100 text-gray-800'
                    } hover:bg-blue-300`}
                    onClick={() => handleSymptomClick(symptom.name, bodyPart)}
                >
                    {symptom.name}
                </li>
                );
            })}
        </ul>
        </div>
    </div>
    </div>
);
};

export default SymptomsSidebar;