import React, { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import SendIcon from "@mui/icons-material/Send";

import { Button } from "@mui/material";
import { GridLoader } from "react-spinners";
import ExtractDailyDietInfo from "../ExtractDailyDietInfo/ExtractDailyDietInfo";
import { PieChart } from "@mui/x-charts/PieChart";
import { valueFormatter } from "../valueFormatter";

import MuscleGoalButtonGroup from "../MuscleGoalButtonGroup/MuscleGoalButtonGroup";
import GenderButtonGroup from "../GenderButtonGroup/GenderButtonGroup";
import AgeButtonGroup from "../AgeButtonGroup/AgeButtonGroup";
import ActivityGroupButton from "../ActivityGroupButton/ActivityGroupButton";
import WeightGroupButton from "../WeightGroupButton/WeightGroupButton";
import { useLocale } from "../providers/LanguageContext";
import TypeWriter from "../TypeWriter/TypeWriter";
import { DailyDiet, UserInfo } from "../types";
import { red } from "@mui/material/colors";
import DietPieChart from "../PieiChart/DietPieChart";

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
  const [dailyDiet, setDailyDiet] = useState<DailyDiet>();
  const [isGraphReady, setIsGraphReady] = useState<boolean>(false);

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY);
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
    setDailyDiet(dailyDiet);
    setIsLoading(false);
  }, [aiResponse]);
  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);

  async function aiRun() {
    const prompt = `Please give me approximate amount of calories, protein, fat and sugar I need to take to reach my goal of ${userInfo.muscleGoal}ing weight, if I am ${userInfo.age} years old ${userInfo.gender} and I work out ${userInfo.activity} days a week and currently weigh ${userInfo.weight}
    `;
    setResponse((e) => "");
    setDailyDiet((e) => null);
    setIsGraphReady(false);
    setIsLoading(true);
    const graphPrompt = `Please give me Protein:%, Fat:%, Sugar:% from my daily diet (total should make 100% of the diet) if my goal is to ${userInfo.muscleGoal}ing weight, if I am ${userInfo.weight} kg ${userInfo.age} years old ${userInfo.gender} and I work out ${userInfo.activity} days a week.
    the answer should be in this format **Goal:** 

**Calorie Needs:** Approximately  calories per day**

**Macronutrient Distribution:**
**Protein - <one integer>%**
**Fat - <one integer>%**
**Sugar - <one integer>%**`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    setResponse(text);
    const graphResult = await model.generateContent(graphPrompt);
    const dailyDietResult = graphResult.response.text();
    const dailyDietInfo = ExtractDailyDietInfo(dailyDietResult);
    console.log(dailyDietResult);
    console.log(dailyDietInfo);
    setDailyDiet(dailyDietInfo);
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
    <div>
      <div className="min-h-wrapper flex flex-col bg-chatbot-background bg-cover">
        <div className="flex flex-row h-90vh gap-3 justify-center mt-5 mb-5 ">
          <div className="flex flex-col gap-2 items-center mt-5 m-5 text-white  w-3/4   ">
            <h1 className="font-serif text-3xl font-semibold text-white ">
              Try our AI assistant to create a diet plan
            </h1>
            <div className="flex flex-row gap-10 w-full">
              <div className=" shadow-lg shadow-slate-200 flex flex-col w-full h-80vh bg-gray-800 bg-opacity-75 rounded-2xl items-center border border-b-gray-500  ">
                <div className="2xl:hidden flex flex-col items-center justify-center font-bold font-serif text-2xl mt-36  ">
                  Please Enter full screen to use chatbot
                </div>
                <div className="w-95% h-full shadow-lg shadow-slate-800  bg-opacity-35 border border-gray-400 rounded-2xl m-5 hidden grid-rows-2 2xl:grid ">
                  <div>
                    <div className="flex flex-row">
                      <MuscleGoalButtonGroup
                        muscleGoalData={buttonInputs.muscleGoalData}
                        handleChange={handleChange}
                        userInfo={userInfo}
                      ></MuscleGoalButtonGroup>

                      <div className="flex flex-row w-1/2 h-3/5 rounded-2xl m-5 items-center border justify-start mr-5 p-2 bg-gray-400 bg-opacity-20">
                        <GenderButtonGroup
                          userInfo={userInfo}
                          genderData={buttonInputs.genderData}
                          handleChange={handleChange}
                        ></GenderButtonGroup>
                        <div className="ml-2 w-1/2 ">
                          <AgeButtonGroup
                            userInfo={userInfo}
                            ageData={buttonInputs.ageData}
                            handleChange={handleChange}
                          ></AgeButtonGroup>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row gap-10 ">
                      <div className="flex flex-col ml-10 mb-2 gap-1">
                        <ActivityGroupButton
                          userInfo={userInfo}
                          handleChange={handleChange}
                          activityData={buttonInputs.activityData}
                        ></ActivityGroupButton>
                      </div>
                      <div className="flex flex-row items-end">
                        <div className="flex flex-col gap-2 justify-end">
                          <WeightGroupButton
                            handleChange={handleChange}
                            userInfo={userInfo}
                            weightData={buttonInputs.weightData}
                          ></WeightGroupButton>
                        </div>
                        <div className="w-1/4 flex flex-col items-center justify-center">
                          <Button
                            onClick={aiRun}
                            variant="contained"
                            endIcon={<SendIcon />}
                          >
                            {chatWindow.Send}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`flex flex-row  m-5 mb-2 gap-1 shadow-lg shadow-slate-700 rounded-xl ${
                      isLoading ? "items-center justify-center" : ""
                    }`}
                  >
                    {isLoading ? (
                      <div className=" z-10 rounded-xl">
                        <GridLoader color="#42A5F5"></GridLoader>
                      </div>
                    ) : (
                      <TypeWriter
                        aiResponse={aiResponse}
                        delay={20}
                      ></TypeWriter>
                    )}
                  </div>
                </div>
              </div>
              <DietPieChart dailyDiet={dailyDiet}></DietPieChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
