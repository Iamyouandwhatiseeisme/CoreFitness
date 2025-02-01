import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import React from "react";
import { UserInfo } from "../types";
interface MuscleGoalButtonGroupProps {
  userInfo: UserInfo;
  handleChange: (key: string, value: string) => void;
  muscleGoalData: string[];
}
export default function MuscleGoalButtonGroup(
  props: MuscleGoalButtonGroupProps
) {
  return (
    <div className="flex flex-col w-1/2 h-3/5 rounded-2xl m-5 items-center border justify-center bg-gray-400 bg-opacity-20 ">
      <label className="text-lg font-bold text-center text-gray-800 dark:text-gray-100  bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Your primary goal is to:{" "}
      </label>
      <div className="shadow-lg shadow-slate-800 rounded-2xl m-2">
        <ToggleButtonGroup
          className="bg-blue-400"
          size="large"
          value={props.userInfo.muscleGoal}
          exclusive
          onChange={(e, value) => {
            if (value !== null) {
              props.handleChange("muscleGoal", value);
            }
          }}
          aria-label="Platform"
        >
          {props.muscleGoalData.map((goal) => {
            return (
              <ToggleButton
                key={goal}
                className="text-black dark:text-black hover:transform hover:scale-105 transition-transform "
                onMouseEnter={(e) => {
                  if (props.userInfo.muscleGoal !== goal) {
                    (e.target as HTMLElement).style.background = "#a3c9f9";
                  }
                }}
                onMouseLeave={(e) => {
                  if (props.userInfo.muscleGoal !== goal) {
                    (e.target as HTMLElement).style.background = "#60A5FA";
                  }
                }}
                value={goal}
                style={{
                  background:
                    props.userInfo.muscleGoal === goal ? "White" : "#60A5FA",
                }}
              >
                {goal}
              </ToggleButton>
            );
          })}
        </ToggleButtonGroup>
      </div>
      <label className="text-lg font-bold text-center text-gray-800 dark:text-gray-100  bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Weight{" "}
      </label>
    </div>
  );
}
