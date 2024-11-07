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
                    <div className="flex flex-col w-1/2 h-3/5 rounded-2xl m-5 items-center border justify-center bg-gray-400 bg-opacity-20 ">
                      <label className="font-serif font-semibold">
                        Your primary goal is to:{" "}
                      </label>

                      <ToggleButtonGroup
                        className="bg-blue-400"
                        size="large"
                        value={userInfo.muscleGoal}
                        exclusive
                        onChange={(e, value) =>
                          handleChange("muscleGoal", value)
                        }
                        aria-label="Platform"
                      >
                        <ToggleButton
                          style={{
                            background:
                              userInfo.muscleGoal === "Lose"
                                ? "white"
                                : "#60A5FA",
                          }}
                          className="text-black hover:bg-gray-400"
                          value="Lose"
                        >
                          Lose
                        </ToggleButton>
                        <ToggleButton
                          style={{
                            background:
                              userInfo.muscleGoal === "Maintain"
                                ? "white"
                                : "#60A5FA",
                          }}
                          className="text-black hover:bg-gray-400"
                          value="Maintain"
                        >
                          Maintain
                        </ToggleButton>
                        <ToggleButton
                          style={{
                            background:
                              userInfo.muscleGoal === "Gain"
                                ? "white"
                                : "#60A5FA",
                          }}
                          className="text-black hover:bg-gray-400"
                          value="Gain"
                        >
                          Gain
                        </ToggleButton>
                      </ToggleButtonGroup>
                      <label className="font-serif font-bold">Weight </label>
                    </div>
                    <div className="flex flex-row w-1/2 h-3/5 rounded-2xl m-5 items-center border justify-start mr-5 p-2 bg-gray-400 bg-opacity-20 ">
                      <label className="font-serif font-bold mr-2">
                        Gender:{" "}
                      </label>
                      <ToggleButtonGroup
                        orientation="vertical"
                        className="bg-blue-400"
                        size="small"
                        value={userInfo.gender}
                        exclusive
                        onChange={(e, value) => handleChange("gender", value)}
                        aria-label="Platform"
                      >
                        <ToggleButton
                          style={{
                            background:
                              userInfo.gender === "Male" ? "white" : "#60A5FA",
                          }}
                          className="text-black hover:bg-gray-400"
                          value="Male"
                        >
                          Male
                        </ToggleButton>
                        <ToggleButton
                          style={{
                            background:
                              userInfo.gender === "Female"
                                ? "white"
                                : "#60A5FA",
                          }}
                          className="text-black hover:bg-gray-400"
                          value="Female"
                        >
                          Female
                        </ToggleButton>
                      </ToggleButtonGroup>
                      <div className="ml-2 w-1/2 ">
                        <FormControl
                          color="neutral"
                          className="bg-white "
                          fullWidth
                        >
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={userInfo.age}
                            onChange={(e, value) => {
                              handleChange("age", value.props.value);
                            }}
                          >
                            <MenuItem value="Age">
                              <em>Age</em>
                            </MenuItem>
                            {Array.from({ length: 85 }, (_, i) => {
                              const value = i + 16;
                              return (
                                <MenuItem key={value} value={value}>
                                  {value}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row gap-10 ">
                    <div className="flex flex-col ml-10 mb-2 gap-1">
                      <h1 className="font-serif">
                        How many days a week do you exercise?
                      </h1>
                      <div className="w-1/2">
                        <FormControl
                          color="neutral"
                          className="bg-white "
                          fullWidth
                        >
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={userInfo.activity}
                            onChange={(e, value) => {
                              console.log(value.props.value);
                              handleChange("activity", value.props.value);
                            }}
                          >
                            <MenuItem key="One" value="One">
                              <em>One</em>
                            </MenuItem>
                            <MenuItem key="Two" value="Two">
                              <em>Two</em>
                            </MenuItem>
                            <MenuItem key="Trhee" value="Trhee">
                              <em>Three</em>
                            </MenuItem>
                            <MenuItem key="Everyday" value="Everyday">
                              <em>Everyday</em>
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h1 className="font-serif">
                        Please specify your weight in KGs
                      </h1>
                      <div className=" w-1/2 ">
                        <FormControl
                          color="neutral"
                          className="bg-white "
                          fullWidth
                        >
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={userInfo.weight}
                            onChange={(e, value) => {
                              handleChange("weight", value.props.value);
                            }}
                          >
                            <MenuItem value="Weight">
                              <em>Weight</em>
                            </MenuItem>
                            {Array.from({ length: 150 }, (_, i) => {
                              const value = i + 30;
                              return (
                                <MenuItem key={value} value={value}>
                                  {value}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </div>
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
