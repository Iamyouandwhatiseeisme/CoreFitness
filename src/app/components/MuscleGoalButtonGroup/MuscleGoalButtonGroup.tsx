import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import React from "react";
import { UserInfo } from "../types";

export default function muscleGoalButtonGroup(props: {
  userInfo: UserInfo;
  handleChange: (key: string, value: string) => void;
  muscleGoalData: string[];
}) {
  return (
    <div className="flex flex-col w-1/2 h-3/5 rounded-2xl m-5 items-center border justify-center bg-gray-400 bg-opacity-20 ">
      <label className="font-serif font-semibold flex flex-col items-center justify-center">
        Your primary goal is to:{" "}
      </label>
      <div className="shadow-lg shadow-slate-800 rounded-2xl m-2">
        <ToggleButtonGroup
          className="bg-blue-400"
          size="large"
          value={props.userInfo.muscleGoal}
          exclusive
          onChange={(e, value) => props.handleChange("muscleGoal", value)}
          aria-label="Platform"
        >
          {props.muscleGoalData.map((goal) => {
            return (
              <ToggleButton
                key={goal}
                className="text-black hover:bg-gray-400"
                value={goal}
                style={{
                  background:
                    props.userInfo.muscleGoal === goal ? "white" : "#60A5FA",
                }}
              >
                {goal}
              </ToggleButton>
            );
          })}
        </ToggleButtonGroup>
      </div>
      <label className="font-serif font-bold">Weight </label>
    </div>
  );
}
