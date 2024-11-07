import React, { use, useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import SendIcon from "@mui/icons-material/Send";

import {
  ToggleButtonGroup,
  ToggleButton,
  FormControl,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { FilterSharp, WidthFull } from "@mui/icons-material";
import { ClipLoader } from "react-spinners";
import MuscleGoalButtonGroup from "../MuscleGoalButtonGroup/MuscleGoalButtonGroup";
import GenderButtonGroup from "../GenderButtonGroup/GenderButtonGroup";
import AgeButtonGroup from "../AgeButtonGroup/AgeButtonGroup";
import ActivityGroupButton from "../ActivityGroupButton/ActivityGroupButton";
import WeightGroupButton from "../WeightGroupButton/WeightGroupButton";

export default function ChatWindow() {
  const [userInfo, setUserInfo] = useState({
    muscleGoal: "Lose",
    gender: "Male",
    age: "Age",
    activity: "One",
    weight: "Weight",
  });
  const [aiResponse, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  useEffect(() => {
    setUserInfo(userInfo);
    console.log(userInfo);
  }, [userInfo]);
  const handleChange = (key, value) => {
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
    const prompt = `Please give me approximate amount of calories, protein, fat and sugar I need to take to reach my goal of ${userInfo.muscleGoal}ing weight, if I am ${userInfo.age} years old ${userInfo.gender} and I work out ${userInfo.activity} days a week and currently weigh ${userInfo.weight}`;
    setIsLoading(true);
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    setResponse(text);
  }
  const buttonInputs = {
    muscleGoalData: ["Lose", "Maintain", "Gain"],
    genderData: ["Male", "Female"],
    ageData: [...Array.from({ length: 86 }, (_, i) => i + 15)],
    activityData: ["One", "Two", "Three", "Everyday"],
    weightData: [...Array.from({ length: 150 }, (_, i) => i + 30)],
  };

  return (
    <div>
      <div className="min-h-wrapper flex flex-col bg-chatbot-background bg-cover">
        <div className="flex flex-row h-90vh gap-3 justify-center mt-5 mb-5 ">
          <div className="flex flex-col gap-2 items-center mt-5 m-5 text-white  w-1/2">
            <h1 className="font-serif text-3xl font-semibold text-white">
              Try our AI assistant to create a diet plan
            </h1>

            <div className="flex flex-col w-full h-80vh bg-gray-800 bg-opacity-75 rounded-2xl items-center border border-b-gray-500 ">
              <div className="w-95% h-full  bg-opacity-35 border border-gray-400 rounded-2xl m-5 grid grid-rows-2">
                <div>
                  <div className="flex flex-row ">
                    <MuscleGoalButtonGroup
                      muscleGoalData={buttonInputs.muscleGoalData}
                      handleChange={handleChange}
                      userInfo={userInfo}
                    ></MuscleGoalButtonGroup>

                    <div className="flex flex-row w-1/2 h-3/5 rounded-2xl m-5 items-center border justify-start mr-5 p-2 bg-gray-400 bg-opacity-20 ">
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
                    <div className="flex flex-col gap-2">
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
                        Send
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row m-5 mb-2 gap-1 ">
                  <textarea
                    className="flex flex-col w-full border border-solid border-gray-400 bg-gray-800 rounded-xl resize-none"
                    readOnly
                    value={isLoading ? "" : aiResponse}
                  ></textarea>
                  {isLoading && (
                    <div className="absolute z-10 rounded-xl">
                      <ClipLoader size="150px" color="green" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
