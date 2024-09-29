'use client';
import React, { useState } from 'react';
import Head from 'next/head';
import { Row, Col, Button, Alert, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import symptomsData from './data/symptoms.json';

const CategoryDropdown = ({
  category,
  selectedSymptoms,
  handleCheckboxChange,
  className,
  isOpen,
  toggleDropdown,
}) => {
  return (
    <div className={`relative category-dropdown ${className}`}>
      <button
        onClick={() => toggleDropdown(category.id)}
        className="bg-green-800 text-white py-2 px-4 rounded focus:outline-none focus:ring-4 focus:ring-blue-300 hover:bg-darkGreen w-full"
      >
        {category.name}
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg z-10">
          {category.symptoms.map((symptom) => (
            <div
              key={`${category.id}-${symptom.id}`}
              className="dropdown-item flex items-center space-x-2 p-2 hover:bg-gray-100"
            >
              <input
                type="checkbox"
                id={`${category.id}-${symptom.id}`}
                value={symptom.name}
                checked={selectedSymptoms.includes(symptom.name)}
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor={`${category.id}-${symptom.id}`}
                className="text-gray-700"
              >
                {symptom.name}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

function HomePage() {
const [selectedSymptoms, setSelectedSymptoms] = useState([]);
const [conditions, setConditions] = useState([]);
const [error, setError] = useState(null);
const [loading, setLoading] = useState(false);
const [otherSymptoms, setOtherSymptoms] = useState('');
const [age, setAge] = useState('');
const [gender, setGender] = useState('');
const [openDropdown, setOpenDropdown] = useState(null);

const handleCheckboxChange = (event) => {
  const { value, checked } = event.target;
  if (checked) {
    setSelectedSymptoms([...selectedSymptoms, value]);
  } else {
    setSelectedSymptoms(selectedSymptoms.filter(symptom => symptom !== value));
  }
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
        symptoms: [...selectedSymptoms, otherSymptoms].join(', '),
        age,
        gender,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch possible conditions');
    }

    const data = await response.json();

    const formattedConditions = data.conditions
      .filter(condition => condition.trim() !== '') 
      .map(condition => {
        const cleanedCondition = condition.replace(/\*\*/g, '').trim();
        const [name, ...descriptionParts] = cleanedCondition.split(':');
        return {
          name: name.trim(),
          description: descriptionParts.join(':').trim(),
        };
      });

    setConditions(formattedConditions);
  } catch (err) {
    console.error('Error:', err);
    setError('An error occurred while diagnosing symptoms.');
  } finally {
    setLoading(false);
  }
};

const handleReset = () => {
  setSelectedSymptoms([]);
  setOtherSymptoms('');
  setAge('');
  setGender('');
  setConditions([]);
  setError(null);
};

const toggleDropdown = (id) => {
  setOpenDropdown(openDropdown === id ? null : id);
};

return (
  <div className="container mx-auto px-4">
    <header className="bg-darkGreen text-white py-4">
      <h1 className="text-4xl font-bold text-center">Symptom Diagnosis Tool</h1>
    </header>

    <main className="mt-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="formAge" className="block text-sm font-medium text-gray-700">Age</label>
            <input
              id="formAge"
              type="number"
              value={age}
              onChange={handleAgeChange}
              placeholder="Enter your age"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="formGender" className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              id="formGender"
              value={gender}
              onChange={handleGenderChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 focus:ring-4 focus:ring-red-500"
        >
          Reset
        </button>

        <hr className="my-6 border-t border-gray-300" />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {symptomsData.symptoms.map((category) => (
            <div key={category.id}>
              <CategoryDropdown
                category={category}
                selectedSymptoms={selectedSymptoms}
                handleCheckboxChange={handleCheckboxChange}
                className={`${category.name.toLowerCase().replace(/\s+/g, '-')}-dropdown`}
                isOpen={openDropdown === category.id}
                toggleDropdown={toggleDropdown}
              />
            </div>
          ))}
        </div>

        <section className="selected-symptoms mt-8">
          <h2 className="text-xl font-semibold">Selected Symptoms:</h2>
          {selectedSymptoms.length > 0 ? (
            <ul className="list-disc ml-5">
              {selectedSymptoms.map((symptom, index) => (
                <li key={index}>{symptom}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No symptoms selected.</p>
          )}
        </section>

        <div className="mt-6">
          <label htmlFor="formOtherSymptoms" className="block text-sm font-medium text-gray-700">
            Other Symptoms
          </label>
          <textarea
            id="formOtherSymptoms"
            value={otherSymptoms}
            onChange={handleTextAreaChange}
            placeholder="If you have any other symptoms, please enter them here."
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
    
  

        <br />
    
        <Button variant="primary" type="submit" className="mt-3" disabled={loading}>
          {loading ? 'Diagnosing...' : 'Diagnose'}
        </Button>
      </form>

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

      <section className="results mt-5">
<h2>Possible Conditions:</h2>
{conditions.length > 0 ? (
  <Row>
    {conditions.map((condition, index) => (
      <Col
        md={index === 0 || index === conditions.length - 1 ? 12 : 6}
        key={index}
        className={`mb-3 ${index !== 0 && index !== conditions.length - 1 ? 'bg-light' : ''}`}
      >
        <Card>
          <Card.Body>
            <Card.Title>{condition.name}</Card.Title>
            <Card.Text>{condition.description}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
) : (
  <p>No conditions found.</p>
)}
</section>
    </main>
  </div>
);
}


export default HomePage; 