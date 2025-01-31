import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import { UserInfo } from "../types";

interface GenderButtonGroupProps {
  genderData: string[];
  userInfo: UserInfo;
  handleChange: (key: string, value: string) => void;
}
export default function GenderButtonGroup(props: GenderButtonGroupProps) {
  return (
    <div>
      <label className="text-lg font-bold text-center text-gray-800 dark:text-gray-100 font-serif bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Gender:{" "}
      </label>

      <ToggleButtonGroup
        orientation="vertical"
        className="bg-blue-400"
        size="small"
        value={props.userInfo.gender}
        exclusive
        onChange={(e, value) => {
          if (value !== null) {
            props.handleChange("gender", value);
          }
        }}
        aria-label="Platform"
      >
        {props.genderData.map((item) => (
          <ToggleButton
            onMouseEnter={(e) => {
              if (props.userInfo.gender !== item) {
                (e.target as HTMLElement).style.background = "#a3c9f9";
              }
            }}
            onMouseLeave={(e) => {
              if (props.userInfo.gender !== item) {
                (e.target as HTMLElement).style.background = "#60A5FA";
              }
            }}
            key={item}
            style={{
              background: props.userInfo.gender === item ? "White" : "#60A5FA",
            }}
            className="text-black dark:text-black hover:transform hover:scale-105 transition-transform hover:bg-slate-600"
            value={item}
          >
            {item}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
}
