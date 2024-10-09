import React, { useRef } from 'react';

const CategoryDropdown = ({
category,
selectedSymptoms,
handleCheckboxChange,
className,
isOpen,
toggleDropdown,
}) => {
const dropdownRef = useRef(null);

return (
    <div
    id={`dropdown-${category.id}`}
    ref={dropdownRef}
    className={`relative category-dropdown flex flex-wrap ${className}`}
    >
    <button
        type="button"
        onClick={() => toggleDropdown(category.id)}
        className="bg-symptomButtons text-white w-full dark:bg-background border sm:w-48 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 hover:bg-green-700 transition-all text-center truncate whitespace-nowrap"
    >
        {category.name}
    </button>

    {isOpen && (
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 max-h-72 overflow-y-auto bg-white border border-gray-200 shadow-lg rounded-lg z-10 sm:w-80 md:w-80">
        {category.symptoms
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((symptom) => (
            <label
                key={`${category.id}-${symptom.id}`}
                htmlFor={`${category.id}-${symptom.id}`}
                className="flex items-center space-x-3 p-3 hover:bg-gray-100 transition-colors cursor-pointer text-sm sm:text-base md:text-lg"
            >
                <input
                type="checkbox"
                id={`${category.id}-${symptom.id}`}
                value={symptom.name}
                checked={selectedSymptoms.some(
                    (item) => item.symptom === symptom.name && item.bodyPart === category.name
                )}
                onChange={(e) => handleCheckboxChange(e, category.name)}
                className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <span className="text-gray-700">{symptom.name}</span>
            </label>
            ))}
        </div>
    )}
    </div>
);
};

export default CategoryDropdown;