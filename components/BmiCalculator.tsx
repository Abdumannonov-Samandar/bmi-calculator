// components/BmiCalculator.tsx

"use client";

import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

const BmiCalculator = () => {
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState('');
  const [progress, setProgress] = useState(0);

  const calculateBMI = () => {
    const heightInMeters = parseFloat(height) / 100; // Convert height to meters
    const weightInKg = parseFloat(weight); // Use weight directly as kg
    if (heightInMeters > 0 && weightInKg > 0) {
      const calculatedBmi = weightInKg / (heightInMeters * heightInMeters);
      setBmi(calculatedBmi);
      setProgress((calculatedBmi / 38) * 100); // Adjust progress scale based on BMI max (38)
      setBmiCategory(getBMICategory(calculatedBmi));
    } else {
      alert("Please enter valid height and weight.");
    }
  };

  const getBMICategory = (bmi: number): string => {
    if (bmi < 17) return 'Underweight';
    else if (bmi >= 17 && bmi < 23) return 'Normal';
    else if (bmi >= 23 && bmi < 38) return 'Overweight';
    else return 'Obese';
  };

  return (
    <div className="p-4 border rounded shadow-lg">
      <h2 className="text-xl font-bold text-center">BMI Calculator</h2>
      <div className="flex flex-col items-center">
        <Input 
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setAge(e.target.value)}
          className="mt-4 w-full max-w-xs"
        />
        <Input 
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setHeight(e.target.value)}
          className="mt-4 w-full max-w-xs"
        />
        <Input 
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setWeight(e.target.value)}
          className="mt-4 w-full max-w-xs"
        />
        <Button 
          onClick={calculateBMI} 
          className="mt-4 w-full max-w-xs"
        >
          Calculate BMI
        </Button>

        {bmi !== null && (
          <div className="mt-4 text-center">
            <h3>Your BMI: {bmi.toFixed(2)}</h3>
            <p className={`font-bold ${bmiCategory === 'Normal' ? 'text-green-500' : 'text-red-500'}`}>
              Category: {bmiCategory}
            </p>
            <div className="relative w-full h-2 mt-4 bg-gray-200 rounded-full">
              <div 
                className={`absolute h-full bg-${bmiCategory === 'Underweight' ? 'blue' : bmiCategory === 'Normal' ? 'green' : 'red'}-500`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BmiCalculator;
