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
      <label className="font-serif font-bold mr-2">Gender: </label>

      <ToggleButtonGroup
        orientation="vertical"
        className="bg-blue-400"
        size="small"
        value={props.userInfo.gender}
        exclusive
        onChange={(e, value) => props.handleChange("gender", value)}
        aria-label="Platform"
      >
        {props.genderData.map((item) => (
          <ToggleButton
            key={item}
            style={{
              background: props.userInfo.gender === item ? "White" : "#60A5FA",
            }}
            className="text-black hover:bg-gray-400"
            value={item}
          >
            {item}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
}
