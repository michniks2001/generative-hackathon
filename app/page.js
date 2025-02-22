"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const MoodUI = () => {
  const [mood, setMood] = useState("");
  const [generatedUI, setGeneratedUI] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const callBE = async () => {
    setIsLoading(true);
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
      console.log(generatedUI)
    } catch (error) {
      console.error("Error:", error);
    }
    setIsLoading(false);
  };

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      await callBE();
    }
  };

  function stringToJSX() {
    const parser = new DOMParser();
    const doc = parser.parseFromString(generatedUI, 'text/html');
    return createReactElements(doc.body.firstChild);
  }

  function createReactElements(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.nodeValue;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
      return null;
    }

    const children = Array.from(node.childNodes).map(child => createReactElements(child));
    return React.createElement(node.tagName, getNodeAttributes(node), children);
  }

  function getNodeAttributes(node) {
    const attributes = {};
    for (let i = 0; i < node.attributes.length; i++) {
      attributes[node.attributes[i].name] = node.attributes[i].value;
    }
    return attributes;
  }

  function MyComponent() {
    return <div>{stringToJSX(generatedUI)}</div>;
  }


  return (
    <div className="transition-all duration-300 ease-in-out min-h-screen bg-gray-50 p-8 flex flex-col items-center justify-center">
      <div>
        {generatedUI ? (
          <MyComponent />
        ) : <div />
        }
      </div>
      <Card className="w-full max-w-md">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-center mb-4">How are you feeling?</h2>
          {
            isLoading ?
              <h1>Loading..</h1>
              : <Input
                type="text"
                placeholder="Describe your mood..."
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full p-2 rounded-lg"
              />
          }
        </CardContent>
      </Card>
    </div>
  );
};

export default MoodUI;
