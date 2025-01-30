import nursesData from '../data/nurses.json';

export function selectNurse(userData) {
const { age, symptoms } = userData;

// Mental health-related symptoms → Nurse Taylor
if (symptoms.some(s => s.bodyPart === 'Mental' || s.bodyPart === 'Emotional')) {
    return nursesData.nurses.find(n => n.id === 4);
}

//  Emergency (Nurse Alex)
if (symptoms.some(s => s.bodyPart === 'Heart' || s.bodyPart === 'Lungs')) {
    return nursesData.nurses.find(n => n.id === 2);
}

// Pediatrics (age < 18) → Nurse Jordan
if (age && parseInt(age) < 18) {
    return nursesData.nurses.find(n => n.id === 3);
}

// Geriatrics (age > 65) → Nurse Sarah
if (age && parseInt(age) > 65) {
    return nursesData.nurses.find(n => n.id === 1);
}

// Default to Nurse Riley

else {
    return nursesData.nurses.find(n => n.id === 5);

}
}