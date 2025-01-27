'use client';
import React, { useState, useEffect } from 'react';

import symptomsData from './data/symptoms.json';
import BodyDiagram from './components/BodyDiagram';
import SymptomsSidebar from './components/Sidebar';
import CategoryButtons from './components/CategoryButtons';
import CategorySidebar from './components/CategorySidebar';
import Chat from './components/chat/Chat';
import PDFGenerator from './components/PDFGenerator';

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
  const [isCategorySidebarOpen, setIsCategorySidebarOpen] = useState(false); 
  const [doctorsNotes, setDoctorsNotes] = useState('');
  const [userInput, setUserInput] = useState('');
  const [symptoms, setSymptoms] = useState([]);
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [lifestyle, setLifestyle] = useState([]);
  const [showFollowUpForm, setShowFollowUpForm] = useState(false); 
  const [showFollowUpButton, setShowFollowUpButton] = useState(false);
  const [followUpQuestion, setFollowUpQuestion] = useState('');
  const [followUpResponse, setFollowUpResponse] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newConditions, setNewConditions] = useState([]);
const [updatedConditions, setUpdatedConditions] = useState([]);
const [highlightCondition, setHighlightCondition] = useState(null);



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

  const onUpdateNotes = (notes) => {
    setDoctorsNotes(notes);
    console.log("onUpdateNotes called with:", notes);
    
  };

  useEffect(() => {
    console.log("doctorsNotes state changed to:", doctorsNotes);
  }, [doctorsNotes]);

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
    setLoading(true);
  
  
    if (selectedSymptoms.length === 0 && otherSymptoms.trim() === '') {
      setError('Please select at least one symptom or enter other symptoms.');
      setLoading(false); 
      return;
    }
  
    if (!age || !gender) {
      setError('Please enter your age and gender.');
      setLoading(false);
      return;
    }
  
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
          doctorsNotes,

        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch possible conditions');
      }

      const data = await response.json();

      setOpeningResponse(data.openingResponse);
      setClosingResponse(data.closingResponse);
      setConditions(data.conditions);
      setShowFollowUpButton(true); 
      setShowResults(true);
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred while diagnosing symptoms.');
    } finally {
      setLoading(false);
          };
        };


        const handleFollowUpSubmit = async (e) => {
          e.preventDefault();
          if (!followUpQuestion.trim()) return;
        
          try {
            const response = await fetch('/api/follow-up', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                question: followUpQuestion,
                chatHistory,
                conditions,
                age,
                gender,
                doctorsNotes,
              }),
            });
        
            const data = await response.json();
        
            setFollowUpResponse(data.answer);
        
            // Update Conditions
            if (data.newConditions.length > 0) {
              setConditions((prev) => [...prev, ...data.newConditions]);
            }
        
            // Update Existing Conditions
            if (data.updatedConditions.length > 0) {
              setUpdatedConditions(data.updatedConditions);
            }
        
            // Highlight a specific condition if needed
            setHighlightCondition(data.highlightCondition);
        
            // Update chat history
            setChatHistory((prev) => [
              ...prev,
              { role: 'user', content: followUpQuestion },
              { role: 'assistant', content: data.answer },
            ]);
        
          } catch (error) {
            console.error('Error fetching follow-up:', error);
            setFollowUpResponse('Error retrieving response. Please try again.');
          }
        };




  const handleReset = () => {
    setSelectedSymptoms([]);
    setOtherSymptoms('');
    setAge('');
    setGender('');
    setConditions([]);
    setError(null);
    setShowResults(false); 
    setDoctorsNotes('');
    localStorage.removeItem('nurseChatHistory');
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

  const validateAgeInput = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 2);
    handleAgeChange({ target: { value } });
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


  const handleRemoveSymptom = (index, e) => {
    setSelectedSymptoms(prev => prev.filter((_, i) => i !== index));
};

  return (
    <div className="min-h-screen">
      {/* Fixed Header */}
      <header className="fixed bg-header text-white top-0 left-0 w-full z-20 py-4">
        <div className="container mx-auto px-4 flex justify-center items-center"> 
          <img src="/static/icon.png" alt="Icon" className="h-10 w-10 mr-3" />
          <h1 className="text-4xl font-bold">Diagnoself</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-6">
        <form onSubmit={handleSubmit} className="max-w-6xl mx-auto space-y-8">
          {/* Personal Info Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
              <label htmlFor="formAge" className="block text-sm font-medium">Age</label>
              <input
                id="formAge"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength="2"
                value={age}
                onChange={validateAgeInput}
                placeholder="Enter your age"
                className="w-full p-2 rounded-md dark:bg-textArea shadow-sm border focus:ring-2"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="formGender" className="block text-sm font-medium">Gender</label>
              <select
                id="formGender"
                value={gender}
                onChange={handleGenderChange}
                className="w-full p-2 rounded-md dark:bg-textArea shadow-sm border focus:ring-2"
              >
                <option value="">Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </section>

          <hr className="border-t" />

          {/* Symptoms Selection Section */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Category Buttons */}
            <div className="lg:col-span-1">
            <div className="mt-4 flex justify-center">
                <button
                  type="button"
                  onClick={() => setIsCategorySidebarOpen(true)}
                  className="px-2 mb-2 rounded text-lg category-btn dark:bg-background"
                  title="All Categories"
                >All Body Parts</button>
              </div>
              <CategoryButtons handleCategoryClick={handleCategoryClick} />

            </div>

            {/* Middle: Body Diagram */}
            <div className="lg:col-span-1">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold">What&apos;s bothering you?</h2>
              </div>
              <BodyDiagram
                selectedSymptoms={selectedSymptoms}
                handleSymptomClick={handleSymptomClick}
                setSelectedBodyPart={setSelectedBodyPart}
              />
            </div>

            {/* Right: Selected Symptoms */}
            <div className="lg:col-span-1 p-4 shadow-lg rounded-lg">
              <h2 className="text-xl font-semibold text-center mb-4">Selected Symptoms</h2>
              {selectedSymptoms.length > 0 ? (
                <div className="space-y-2">
                  {selectedSymptoms.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-2 rounded">
                      <span>{item.bodyPart}: {item.symptom}</span>
                      <button
                        onClick={() => handleRemoveSymptom(index)}
                        className="ml-2"
                        type="button"
                      >X</button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center">No symptoms selected.</p>
              )}
            </div>
          </section>
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Additional Symptoms */}
          <section className="space-y-4 text-center">
            <label htmlFor="formOtherSymptoms" className="block text-md font-medium text-center">
              Other Symptoms
            </label>
            <textarea
              id="formOtherSymptoms"
              value={otherSymptoms}
              onChange={handleTextAreaChange}
              placeholder="If you have any other symptoms, or additional details, please enter them here."
              className="w-3/4 p-3  rounded-md  bg-textArea border border-gray-300 shadow-sm border min-h-[100px]"
            />
          </section>

  <div className="mt-6">
  <label 
    htmlFor="doctorsNotes" 
    className="block text-sm font-medium text-foreground"
  >
    Doctor Notes
  </label>
  <textarea
    id="doctorsNotes"
    value={doctorsNotes}
    readOnly
    className="mt-1 block w-full p-2 bg-background text-foreground border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    rows={4}
  />
</div>
</div>
          {/* Action Buttons */}
          <section className="flex justify-center space-x-4">
            <button
              type="submit"
              className="bg-diagnoseButton text-white py-2 px-3 hover:bg-blue-700 mr-3 py-2 px-6 rounded disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Diagnosing...' : 'Diagnose'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="py-2 px-6 rounded bg-resetButton text-white py-2 px-3 rounded hover:bg-red-500 focus:ring-4 focus:ring-red-500"
            >
              Reset
            </button>
          </section>
        </form>

     
        <div className="mt-6">

          <Chat 
            userInput={userInput}
            setSymptoms={setSymptoms}
            symptoms={selectedSymptoms}
            age={age}
            gender={gender}
            medicalHistory={medicalHistory}
            otherSymptoms={otherSymptoms}
            lifestyle={lifestyle}
            onUpdateNotes={onUpdateNotes}
            doctorsNotes={doctorsNotes}
            conditions={conditions} 
            
          />
        </div>

        {error && <div className="mt-3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}
        {showResults && (
    <section className="results text-center mt-5">
    <p className="text-cardText mb-4">{openingResponse}</p>
    <h2 className="text-xl font-semibold mb-4">Possible Conditions:</h2>
    {conditions.length > 0 ? (
  <div className="flex flex-wrap -mx-2">
    {conditions.map((condition, index) => {
      const isHighlighted = condition.name === highlightCondition;
      const isUpdated = updatedConditions.some((upd) => upd.name === condition.name);
      
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
        <div key={index} className="w-full md:w-1/2 px-2 mb-3">
          <div className={`bg-resultsCard shadow-lg rounded-lg p-4 ${isHighlighted ? 'border-2 border-yellow-500' : ''}`}>
            <h3 className={`text-lg font-semibold ${severityColor}`}>
              {condition.name}
            </h3>
            <p className="text-cardText font-light">{condition.description}</p>
            <p className="text-sm text-gray-500">Severity: {condition.severity}</p>
            
            {isUpdated && (
              <p className="text-sm text-blue-500">Updated: {updatedConditions.find(upd => upd.name === condition.name)?.update}</p>
            )}
          </div>
        </div>
      );
    })}
  </div>
) : (
  <p>No conditions found.</p>
)}
    <div className="mt-6 flex justify-center items-center">
    <div className="bg-resultsCard w-2/3 shadow-lg rounded-lg p-6 mt-6">
  <h3 className="text-xl font-semibold blueText mb-4">Recommendation:</h3>
  <hr className="border-gray-300 my-4" />
  <p className="mt-4">{closingResponse}</p>
  </div>
  </div>


{/* Follow-Up Button */}
  <div className="mt-6">
  <button
    onClick={() => setShowFollowUpForm(true)}
    className="bg-diagnoseButton text-white py-2 px-3 hover:bg-blue-700 mr-3 py-2 px-6 rounded" 
  >
    Ask a follow-up question
  </button>
</div>
      {/* Follow-Up Question Form */}
      {showFollowUpForm && (
          <div className="flex flex-col items-center mt-6">
            <h2 className="text-lg font-semibold">Ask a Follow-Up Question</h2>
            <form onSubmit={handleFollowUpSubmit} className="mt-4">
              <textarea
                value={followUpQuestion}
                onChange={(e) => setFollowUpQuestion(e.target.value)}
                placeholder="Ask about a specific condition, symptom, or treatment..."
                className="w-3/4 p-3  rounded-md  bg-textArea border border-gray-300 shadow-sm border"
                rows={3}
              />
              <button
                type="submit"
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Ask Question
              </button>
            </form>

            {followUpResponse && (
              <div className="mt-4 p-4 bg-textArea  rounded-md">
                <h3 className="text-md font-semibold">Response:</h3>
                <p>{followUpResponse}</p>
              </div>
            )}
          </div>
        )}
<div className="mt-6">
{showResults && 
<PDFGenerator 
  conditions={conditions}
  openingResponse={openingResponse}
  closingResponse={closingResponse}
  doctorsNotes={doctorsNotes}
  symptoms={selectedSymptoms}

/>}
</div>
  </section>
)}

      </main>

         {/* Sidebars */}
         {isCategorySidebarOpen && (
          <CategorySidebar
            symptomsData={symptomsData.symptoms}
            onCategorySelect={handleCategorySelect}
            onClose={() => setIsCategorySidebarOpen(false)}
          />
        )}

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
  );
}

export default HomePage;