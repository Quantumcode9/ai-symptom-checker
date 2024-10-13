'use client';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import CategoryDropdown from './components/CategorySidebar';
import symptomsData from './data/symptoms.json';
import BodyDiagram from './components/BodyDiagram';
import SymptomsSidebar from './components/Sidebar';
import CategoryButtons from './components/CategoryButtons';
import CategorySidebar from './components/CategorySidebar';

function HomePage() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [otherSymptoms, setOtherSymptoms] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showResults, setShowResults] = useState(false); 
  const [openingResponse, setOpeningResponse] = useState('');
  const [closingResponse, setClosingResponse] = useState('');
  const [selectedBodyPart, setSelectedBodyPart] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false); 
  const [isCategorySidebarOpen, setIsCategorySidebarOpen] = useState(true);



  
  const handleSymptomClick = (symptomName, categoryName) => {
    const isSelected = selectedSymptoms.some(
      (item) => item.symptom === symptomName && item.bodyPart === categoryName
    );

    if (isSelected) {
      setSelectedSymptoms(
        selectedSymptoms.filter(
          (item) => !(item.symptom === symptomName && item.bodyPart === categoryName)
        )
      );
    } else {
      setSelectedSymptoms([
        ...selectedSymptoms,
        { symptom: symptomName, bodyPart: categoryName },
      ]);
    }
  };

  const handleCategoryClick = (event, category) => {
    event.preventDefault();
    setSelectedBodyPart(category); 
    setSidebarOpen(true); 
  };

  const handleTextAreaChange = (event) => {
    setOtherSymptoms(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
  
    if (selectedSymptoms.length === 0 && otherSymptoms.trim() === '') {
      setError('Please select at least one symptom or enter other symptoms.');
      return;
    }
  
    if (!age || !gender) {
      setError('Please enter your age and gender.');
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await fetch('/api/diagnose', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symptoms: selectedSymptoms,
          otherSymptoms,
          age,
          gender,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch possible conditions');
      }

      const data = await response.json();

      setOpeningResponse(data.openingResponse);
      setClosingResponse(data.closingResponse);
      setConditions(data.conditions);
      setShowResults(true);
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred while diagnosing symptoms.');
    } finally {
      setLoading(false);
          };
        };


  const handleReset = () => {
    setSelectedSymptoms([]);
    setOtherSymptoms('');
    setAge('');
    setGender('');
    setConditions([]);
    setError(null);
    setShowResults(false); 
  };

  const handleCategorySelect = (categoryName) => {
    setSelectedBodyPart(categoryName);
    setIsCategorySidebarOpen(false); 
    setSidebarOpen(true);   
  };

  const closeCategorySidebar = () => {
    setSidebarOpen(false);
    setSelectedBodyPart(null);
  };

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdown) {
        const dropdownElement = document.getElementById(`dropdown-${openDropdown}`);
        if (dropdownElement && !dropdownElement.contains(event.target)) {
          setOpenDropdown(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  return (
    <div className="container mx-auto px-4 min-h-screen">
      <header className="bg-header text-white py-4 w-full fixed top-0 left-0 z-20">
        <div className="flex justify-center items-center"> 
          <img src="/static/icon.png" alt="Icon" className="h-10 w-10 mr-3" />
          <h1 className="text-4xl font-bold">Diagnoself</h1>
        </div>
      </header>
      
      <main className="mt-20">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="formAge" className="block text-sm font-medium text-gray-500">Age</label>
              <input
                id="formAge"
                type="number"
                value={age}
                onChange={handleAgeChange}
                placeholder="Enter your age"
                className="mt-1 block w-full p-2 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="formGender" className="block text-sm font-medium text-gray-500">Gender</label>
              <select
                id="formGender"
                value={gender}
                onChange={handleGenderChange}
                className="mt-1 block w-full text-gray-700 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>



      {isCategorySidebarOpen && (
        <CategorySidebar
          symptomsData={symptomsData.symptoms}
          onCategorySelect={handleCategorySelect}
          onClose={() => setIsCategorySidebarOpen(false)}
        />
      )}
      

          <hr className="my-6 border-t border-gray-300" />



          <div className="layout-container">
            

          <div className="category-container">
        <CategoryButtons handleCategoryClick={handleCategoryClick} />
      </div>
      
        <div className="diagram-container">
          <BodyDiagram
          selectedSymptoms={selectedSymptoms}
          handleSymptomClick={handleSymptomClick}
          setSelectedBodyPart={setSelectedBodyPart} 
        />


<button
        type="button"
        onClick={() => setIsCategorySidebarOpen(true)}
        className="bg-none border border-white text-white text-lg px-2 hover:bg-diagnoseButton rounded"
      >
       ≡
      </button>
        </div>

          {selectedBodyPart && (
          <SymptomsSidebar
            bodyPart={selectedBodyPart}
            symptomsData={symptomsData}
            onClose={() => setSelectedBodyPart(null)}
            selectedSymptoms={selectedSymptoms}
            handleSymptomClick={handleSymptomClick}
          />
        )}

      </div>

          <section className="selected-symptoms text-center mt-8">
            <h2 className="text-xl font-semibold">Selected Symptoms</h2>
            {selectedSymptoms.length > 0 ? (
              <div className="list-disc text-symptomButtons">
                {selectedSymptoms.map((item, index) => (
                  <p key={index}>{item.bodyPart}: {item.symptom}</p>
                ))}
              </div>
            ) : (
              <p className="text-foreground">No symptoms selected.</p>
            )}
          </section>

          <div className="mt-6">
            <label htmlFor="formOtherSymptoms" className="block text-sm text-center font-medium text-foreground">
              Other Symptoms
            </label>
            <textarea
              id="formOtherSymptoms"
              value={otherSymptoms}
              onChange={handleTextAreaChange}
              placeholder="If you have any other symptoms, please enter them here."
              className="mt-1 block w-full p-2 bg-background border border-gray-300 rounded-md shadow-sm focus:ring-blue-200 focus:border-blue-200 sm:text-sm"
            />
          </div>

          <div className="flex justify-center mt-3">
            <button
              type="submit"
              className="bg-diagnoseButton text-white py-2 px-3 hover:bg-blue-700 mr-3 rounded disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Diagnosing...' : 'Diagnose'}
            </button>
            <button
            type="button"
            onClick={handleReset}
            className="bg-resetButton text-white py-2 px-3 rounded hover:bg-red-500 focus:ring-4 focus:ring-red-500"
          >
            Reset
          </button>
          </div>
        </form>

        {error && <div className="mt-3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}
        {showResults && (
    <section className="results text-center mt-5">
    <p className="text-cardText mb-4">{openingResponse}</p>
    <h2 className="text-xl font-semibold mb-4">Possible Conditions:</h2>
    {conditions.length > 0 ? (
      <div className="flex flex-wrap -mx-2">
        {conditions.map((condition, index) => {

          let severityColor;
          switch (condition.severity.toLowerCase()) {
            case 'low':
              severityColor = 'text-yellow-200';
              break;
            case 'mild':
              severityColor = 'text-yellow-500';
              break;
            case 'moderate':
              severityColor = 'text-orange-500';
              break;
            case 'high':
              severityColor = 'text-red-500';
              break;
            default:
              severityColor = 'text-gray-700';
          }

          return (
            <div
              key={index}
              className="w-full md:w-1/2 px-2 mb-3"
            >
              <div
                className="bg-resultsCard shadow-lg rounded-lg p-4"
              >
                <h3 className={`text-lg font-semibold ${severityColor}`}>
                  {condition.name}
                </h3>
                <p className="text-cardText font-light">
                  {condition.description}
                </p>
                <p className="text-sm text-gray-500">
                  Severity: {condition.severity}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    ) : (
      <p>No conditions found.</p>
    )}
    <div className="bg-resultsCard shadow-lg rounded-lg p-6 mt-6">
  <h3 className="text-xl font-semibold text-blueText mb-4">Recommendation:</h3>
  <hr className="border-gray-300 my-4" />
  <p className="text-blueText mt-4">{closingResponse}</p>
</div>
  </section>
)}
      </main>
    </div>
  );
}

export default HomePage;