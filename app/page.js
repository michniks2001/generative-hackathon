"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const MoodUI = () => {
  const [mood, setMood] = useState("");
  const [generatedUI, setGeneratedUI] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [moodData, setMoodData] = useState({});

  // const [iframeLink, setIframeLink] = useState('');

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
      // setGeneratedUI(data.generatedCode);
      // console.log(generatedUI)
      setMoodData(JSON.parse(data.generatedCode))
      const d = JSON.parse(data.generatedCode)
      console.log(d)
      // {
      //   negativity_score: int,
      //   meditation_audio: null if negativity_score < 3 else string,
      //   video_game: null if negativity_score >= 3 else string,
      //   motivational_quote: string,
      // }
      if (moodData.negativity_score >= 3) {
        // setIframeLink(data.meditation_audio)
        setMoodData({...moodData, iframelink: d.meditation_audio})
        setMoodData({...moodData, iframemsg: 'Try this meditation exercise:'})


      } else {
        setMoodData({...moodData, iframelink: d.video_game})
        setMoodData({...moodData, iframemsg: "Let's stay in a good mood by playing a game!"})
      }

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

  return (
    <div className="transition-all duration-300 ease-in-out min-h-screen bg-gray-50 p-8 flex flex-col items-center justify-center">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div className="bg-blue-100 p-4 rounded shadow">
            <h1 className="text-2xl font-bold text-blue-800">{moodData.summary_of_state}</h1>
            <p className="mt-2 text-blue-700">{moodData.motivational_quote}</p>
          </div>
          <div className="bg-green-100 p-4 rounded shadow">
            <h2 className="text-xl font-bold text-green-800">Write down how you are feeling:</h2>
            <textarea className="w-full mt-2 p-2 rounded border border-green-300" rows="4" placeholder="Express yourself here..."></textarea>
          </div>
          <div className="bg-yellow-100 p-4 rounded shadow">
            <h2 className="text-xl font-bold text-yellow-800">Chat with our friendly bot:</h2>
            <p className="mt-2 text-yellow-700">Need someone to talk to? I&#39;m here to listen and chat with you.</p>
            {/* Chatbot interface would be implemented here */}
          </div>
          <div className="bg-purple-100 p-4 rounded shadow">
            <h2 className="text-xl font-bold text-purple-800">{moodData.iframemsg}</h2>
            {/* <div className="mt-2" dangerouslySetInnerHTML={{ __html: meditationEmbedCode }}></div> */}
            <iframe src={moodData.iframelink} width="320" height="240" allow="autoplay"></iframe>
          </div>
        </div>
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
