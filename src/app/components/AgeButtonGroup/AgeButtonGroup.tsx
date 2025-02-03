import { FormControl, MenuItem, Select } from "@mui/material";
import React from "react";
import { useLocale } from "../providers/LanguageContext";
import { UserInfo } from "../types";

interface AgeButtonGroupProps {
  ageData: number[];
  userInfo: UserInfo;
  handleChange: (key: string, value: number) => void;
}

export default function AgeButtonGroup(props: AgeButtonGroupProps) {
  const { chatWindow } = useLocale();

  return (
    <div className="flex flex-col w-3/5 h-3/5 rounded-2xl m-5 items-center border-2 shadow-lg shadow-black/20  justify-center bg-gray-400 bg-opacity-20">
      <label className="text-lg font-bold text-center text-gray-800 dark:text-gray-100  bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Please specify your:{" "}
      </label>
      <div className="shadow-lg shadow-slate-800/25 rounded-2xl m-2">
        <FormControl color="primary" className="bg-white " fullWidth>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={props.userInfo.age}
            onChange={(e) => {
              props.handleChange("age", e.target.value as number);
            }}
          >
            <MenuItem key="Age" value={chatWindow.Age}>
              <em>{chatWindow.Age}</em>
            </MenuItem>
            {props.ageData.map((item) => {
              return (
                <MenuItem key={item} value={item}>
                  <em>{item}</em>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
      <label className="text-lg font-bold text-center text-gray-800 dark:text-gray-100  bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Age{" "}
      </label>
    </div>
  );
}
