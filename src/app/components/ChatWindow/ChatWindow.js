import React, { useState } from "react";
import {
  ToggleButtonGroup,
  ToggleButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

export default function ChatWindow() {
  const [muscleGoal, setMuscleGoal] = useState("Lose");
  const [gender, setGender] = useState("Male");
  const [age, setAge] = useState("Age");
  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };
  const handleMuscleGoalChange = (e) => {
    setMuscleGoal(e.target.value);
  };
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  return (
    <div>
      <div className="min-h-wrapper flex flex-col bg-chatbot-background bg-cover">
        <div className="flex flex-row h-90vh gap-3 justify-center mt-5 mb-5 ">
          <div className="flex flex-col gap-2 items-center mt-5 m-5 text-white  w-1/2">
            <h1 className="font-serif text-3xl font-semibold text-white">
              Try our AI assistant to create a diet plan
            </h1>

            <div className="flex flex-col w-full h-60vh bg-gray-800 bg-opacity-75 rounded-2xl items-center border border-b-gray-500 ">
              <div className="w-95% h-full  bg-opacity-35 border border-gray-400 rounded-2xl m-5 grid grid-rows-2">
                <div className="flex flex-row">
                  <div className="flex flex-col w-1/2 h-3/5 rounded-2xl m-5 items-center border justify-center bg-gray-400 bg-opacity-20 ">
                    <label className="font-serif font-semibold">
                      Your primary goal is to:{" "}
                    </label>
                    <ToggleButtonGroup
                      className="bg-blue-400"
                      size="large"
                      value={muscleGoal}
                      exclusive
                      onChange={handleMuscleGoalChange}
                      aria-label="Platform"
                    >
                      <ToggleButton
                        style={{
                          background:
                            muscleGoal === "Lose" ? "white" : "#60A5FA",
                        }}
                        className="text-black hover:bg-gray-400"
                        value="Lose"
                      >
                        Lose
                      </ToggleButton>
                      <ToggleButton
                        style={{
                          background:
                            muscleGoal === "Maintain" ? "white" : "#60A5FA",
                        }}
                        className="text-black hover:bg-gray-400"
                        value="Maintain"
                      >
                        Maintain
                      </ToggleButton>
                      <ToggleButton
                        style={{
                          background:
                            muscleGoal === "Gain" ? "white" : "#60A5FA",
                        }}
                        className="text-black hover:bg-gray-400"
                        value="Gain"
                      >
                        Gain
                      </ToggleButton>
                    </ToggleButtonGroup>
                    <label className="font-serif font-bold">Weight </label>
                  </div>
                  <div className="flex flex-row w-1/2 h-3/5 rounded-2xl m-5 items-center border justify-start p-5 bg-gray-400 bg-opacity-20 ">
                    <label className="font-serif font-bold mr-2">
                      Gender:{" "}
                    </label>
                    <ToggleButtonGroup
                      orientation="vertical"
                      className="bg-blue-400"
                      size="small"
                      value={gender}
                      exclusive
                      onChange={handleGenderChange}
                      aria-label="Platform"
                    >
                      <ToggleButton
                        style={{
                          background: gender === "Male" ? "white" : "#60A5FA",
                        }}
                        className="text-black hover:bg-gray-400"
                        value="Male"
                      >
                        Male
                      </ToggleButton>
                      <ToggleButton
                        style={{
                          background: gender === "Female" ? "white" : "#60A5FA",
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
                          value={age}
                          onChange={handleAgeChange}
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

                <div className="bg-green-400 w-1/4 h-1/4 rounded-2xl m-5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
