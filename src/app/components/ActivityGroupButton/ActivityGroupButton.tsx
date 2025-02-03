import { FormControl, MenuItem, Select } from "@mui/material";
import React from "react";
import { UserInfo } from "../types";

interface AcitvityGroupButtonProps {
  activityData: string[];
  userInfo: UserInfo;
  handleChange: (key: string, value: string) => void;
}

export default function ActivityGroupButton(props: AcitvityGroupButtonProps) {
  return (
    <div className="flex flex-col w-3/5 h-3/5 p-4 rounded-2xl m-5 items-center border-2 shadow-lg shadow-black/20  justify-center bg-gray-400 bg-opacity-20">
      <label className="text-lg font-bold text-center text-gray-800 dark:text-gray-100  bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        How many days a week do you exercise?
      </label>
      <div className="shadow-lg shadow-slate-800/25 rounded-2xl m-2">
        <FormControl color="primary" className="bg-white w-full" fullWidth>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={props.userInfo.activity}
            onChange={(e) => {
              props.handleChange("activity", e.target.value as string);
            }}
          >
            {props.activityData.map((item) => (
              <MenuItem key={item} value={item}>
                <em>{item}</em>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
