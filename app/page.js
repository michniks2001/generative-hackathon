"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const MoodUI = () => {
  const [mood, setMood] = useState("");
  const [generatedUI, setGeneratedUI] = useState("");

  const callBE = async () => {
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mood }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await response.json();
      setGeneratedUI(data.generatedCode);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      await callBE();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
      <div>
      {generatedUI ? (
        <div dangerouslySetInnerHTML={{ __html: generatedUI }} />
      ) : <div/>
      }
      </div>
      <Card className="w-full max-w-md">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-center mb-4">How are you feeling?</h2>
          <Input
            type="text"
            placeholder="Describe your mood..."
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full p-2 rounded-lg"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default MoodUI;
