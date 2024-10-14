import React, { useEffect, useRef } from 'react';

const CategorySidebar = ({ symptomsData, onCategorySelect, onClose }) => {
const sidebarRef = useRef(null);

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

return (
    <div ref={sidebarRef} className="fixed top-20 right-0 w-64 h-auto max-h-[70vh] bg-sideBar shadow-lg z-50 mb-10">
    <div className="p-4">
        <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">All Body Parts</h2>
        <button onClick={onClose} className="text-red-500">
            X
        </button>
        </div>
        <div className="overflow-y-auto max-h-[60vh]">
        <ul>
            {symptomsData
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((category) => (
                <li
                key={category.id}
                className="mb-2 p-2 cursor-pointer text-sm sm:text-base transition-colors duration-200 ease-in-out bg-gray-100 text-gray-800 hover:bg-blue-300"
                onClick={() => onCategorySelect(category.name)}
                >
                {category.name}
                </li>
            ))}
        </ul>
        </div>
    </div>
    </div>
);
};

export default CategorySidebar;