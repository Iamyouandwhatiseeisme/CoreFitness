import { FormControl, MenuItem, Select } from "@mui/material";
import React from "react";
import { useLocale } from "../providers/LanguageContext";
import { UserInfo } from "../types";

interface WeightGroupButtonProps {
  handleChange: (key: string, value: number) => void;
  userInfo: UserInfo;
  weightData: number[];
}

export default function WeightGroupButton(props: WeightGroupButtonProps) {
  const { chatWindow } = useLocale();
  return (
    <div className="flex flex-col w-3/5 h-3/5 rounded-2xl m-5 items-center border justify-center bg-gray-400 bg-opacity-20 ">
      <label className="text-lg font-bold text-center text-gray-800 dark:text-gray-100  bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Please specify your weight:{" "}
      </label>
      <div className="shadow-lg shadow-slate-800 rounded-2xl m-2">
        <FormControl color="primary" className="bg-white " fullWidth>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={props.userInfo.weight}
            onChange={(e) => {
              props.handleChange("weight", e.target.value as number);
            }}
          >
            <MenuItem key={chatWindow.Weight} value={chatWindow.Weight}>
              <em>{chatWindow.Weight}</em>
            </MenuItem>
            {props.weightData.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <label className="text-lg font-bold text-center text-gray-800 dark:text-gray-100  bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        In KGs{" "}
      </label>
    </div>
  );
}
