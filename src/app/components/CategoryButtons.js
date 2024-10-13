import React from 'react';




const CategoryButtons = ({ handleCategoryClick }) => {
  return (
    <div className="flex items-center justify-center w-full mx-auto">
      <div className="grid grid-cols-4 md:grid-cols-1 gap-2 w-full">
        <button
          type="button"
          className="category-btn dark:bg-background"
          onClick={(event) => handleCategoryClick(event, 'Skin')}
        >
          Skin
        </button>
        <button
          type="button" 
          className="category-btn dark:bg-background"
          onClick={(event) => handleCategoryClick(event, 'Mental')}
        >
          Mental
        </button>
        <button
          type="button"
          className="category-btn dark:bg-background"
          onClick={(event) => handleCategoryClick(event, 'Teeth')}
        >
          Dental
        </button>
        <button
          type="button" 
          className="category-btn dark:bg-background"
          onClick={(event) => handleCategoryClick(event, 'Emotional')}
        >
          Emotional
        </button>
      </div>
    </div>
  );
};

export default CategoryButtons;