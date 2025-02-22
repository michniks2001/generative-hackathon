"use client"

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect } from 'react';
const getMoodStyles = (mood) => {
  // Convert mood to lowercase for comparison
  const lowerMood = mood.toLowerCase();

  // Base styles that don't change
  let baseStyles = "w-full max-w-md mx-auto transition-all duration-500 ease-in-out ";

  // Happy/positive emotions
  if (lowerMood.includes('happy') || lowerMood.includes('joy') || lowerMood.includes('excited')) {
    return baseStyles + "bg-yellow-100 shadow-lg border-yellow-300";
  }
  // Calm/peaceful emotions
  else if (lowerMood.includes('calm') || lowerMood.includes('peaceful') || lowerMood.includes('relaxed')) {
    return baseStyles + "bg-blue-50 shadow-md border-blue-200";
  }
  // Sad/down emotions
  else if (lowerMood.includes('sad') || lowerMood.includes('down') || lowerMood.includes('depressed')) {
    return baseStyles + "bg-gray-100 shadow-sm border-gray-300";
  }
  // Angry/frustrated emotions
  else if (lowerMood.includes('angry') || lowerMood.includes('frustrated') || lowerMood.includes('mad')) {
    return baseStyles + "bg-red-50 shadow-xl border-red-200";
  }
  // Default state
  return baseStyles + "bg-white shadow border-gray-200";
};

const MoodUI = () => {
  const [mood, setMood] = useState('');
  const [inputStyles, setInputStyles] = useState('bg-white');

  const callBE = async () => {
    try {
      const response = await fetch('api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mood: mood,
        })
      })

      if (!response.ok) {
        throw new Error('Failed to fetch')
      }

      const data = await response.json()
      console.log('Response:', data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleMoodChange = (e) => {
    const newMood = e.target.value;
    setMood(newMood);
    setInputStyles(getMoodStyles(newMood));
  };

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      console.log('Submitting mood:', mood)
      await callBE()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
      <Card className={inputStyles}>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-center mb-4">How are you feeling?</h2>
          <Input
            type="text"
            placeholder="Describe your mood..."
            value={mood}
            onChange={handleMoodChange}
            onKeyPress={handleKeyPress}
            className="w-full p-2 rounded-lg"
          />
          <div className="text-center mt-4">
            <p className="text-gray-600">
              {mood ? `The UI is responding to your ${mood} mood` : 'Type something to see the UI change'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MoodUI;
