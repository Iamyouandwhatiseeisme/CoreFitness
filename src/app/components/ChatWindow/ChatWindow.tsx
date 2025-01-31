import React, { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import SendIcon from "@mui/icons-material/Send";

import { Button } from "@mui/material";
import { GridLoader } from "react-spinners";

import MuscleGoalButtonGroup from "../MuscleGoalButtonGroup/MuscleGoalButtonGroup";
import GenderButtonGroup from "../GenderButtonGroup/GenderButtonGroup";
import AgeButtonGroup from "../AgeButtonGroup/AgeButtonGroup";
import ActivityGroupButton from "../ActivityGroupButton/ActivityGroupButton";
import WeightGroupButton from "../WeightGroupButton/WeightGroupButton";
import { useLocale } from "../providers/LanguageContext";
import TypeWriter from "../TypeWriter/TypeWriter";
import { UserInfo } from "../types";

export default function ChatWindow() {
  const { chatWindow } = useLocale();

  const [userInfo, setUserInfo] = useState<UserInfo>({
    muscleGoal: chatWindow.Lose,
    gender: chatWindow.Male,
    age: chatWindow.Age,
    activity: chatWindow.One,
    weight: chatWindow.Weight,
  });
  const [aiResponse, setResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  useEffect(() => {
    setUserInfo(userInfo);
  }, [userInfo]);
  const handleChange = (key: string, value: string | number) => {
    setUserInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    setResponse(aiResponse);
    setIsLoading(false);
  }, [aiResponse]);
  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);

  async function aiRun() {
    const prompt = `Please give me approximate amount of calories, protein, fat and sugar I need to take to reach my goal of ${userInfo.muscleGoal}ing weight, if I am ${userInfo.age} years old ${userInfo.gender} and I work out ${userInfo.activity} days a week and currently weigh ${userInfo.weight}
    `;
    setResponse("");
    setIsLoading(true);

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    setResponse(text);
  }

  const buttonInputs = {
    muscleGoalData: [chatWindow.Lose, chatWindow.Maintain, chatWindow.Gain],
    genderData: [chatWindow.Male, chatWindow.Female],
    ageData: [...Array.from({ length: 86 }, (_, i) => i + 15)] as number[],
    activityData: [
      chatWindow.One,
      chatWindow.Two,
      chatWindow.Three,
      chatWindow.Everyday,
    ],
    weightData: [...Array.from({ length: 150 }, (_, i) => i + 30)],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-xl">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 font-serif bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Try our AI assistant to create a diet plan
          </h1>

          <div className="w-full max-w-6xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 transition-all duration-300">
            <div className="xl:hidden flex flex-col items-center justify-center p-8 text-center">
              <p className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-4">
                Please switch to full screen for optimal chatbot experience
              </p>
              <div className="w-24 h-1 bg-blue-500 rounded-full" />
            </div>

            <div className="hidden xl:block space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
                    <MuscleGoalButtonGroup
                      muscleGoalData={buttonInputs.muscleGoalData}
                      handleChange={handleChange}
                      userInfo={userInfo}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
                      <GenderButtonGroup
                        userInfo={userInfo}
                        genderData={buttonInputs.genderData}
                        handleChange={handleChange}
                      />
                    </div>

                    <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
                      <AgeButtonGroup
                        userInfo={userInfo}
                        ageData={buttonInputs.ageData}
                        handleChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
                    <ActivityGroupButton
                      userInfo={userInfo}
                      handleChange={handleChange}
                      activityData={buttonInputs.activityData}
                    />
                  </div>

                  <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
                    <WeightGroupButton
                      handleChange={handleChange}
                      userInfo={userInfo}
                      weightData={buttonInputs.weightData}
                    />
                  </div>
                </div>
              </div>

              <Button
                onClick={aiRun}
                variant="contained"
                endIcon={<SendIcon />}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white transition-transform duration-200 hover:scale-[1.02]"
              >
                {chatWindow.Send}
              </Button>

              <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 min-h-[400px] max-h-full">
                {isLoading ? (
                  <div className="h-[400px] flex items-center justify-center">
                    <GridLoader
                      color="#3B82F6"
                      className="dark:text-blue-300"
                    />
                  </div>
                ) : (
                  <div className="prose dark:prose-invert  h-[400px] overflow-y-auto ">
                    <TypeWriter aiResponse={aiResponse} delay={20} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
