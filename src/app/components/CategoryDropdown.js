'use client';
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
        onClick={() => toggleDropdown(category.id)}
        className="bg-green-700 text-white w-100 sm:w-auto py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 hover:bg-green-600 transition-all"
    >
        {category.name}
    </button>

    {isOpen && (
        <div className="absolute left-0 mt-2 w-48 max-h-48 overflow-y-auto bg-white border border-gray-200 shadow-lg rounded-lg z-10">
        {category.symptoms.map((symptom) => (
            <label
            key={`${category.id}-${symptom.id}`}
            htmlFor={`${category.id}-${symptom.id}`}
            className="flex items-center space-x-2 p-2 hover:bg-gray-100 transition-colors cursor-pointer"
            >
            <input
                type="checkbox"
                id={`${category.id}-${symptom.id}`}
                value={symptom.name}
                checked={selectedSymptoms.includes(symptom.name)}
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
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