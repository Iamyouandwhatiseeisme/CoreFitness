import { FormControl, MenuItem, Select } from "@mui/material";
import React from "react";
import { UserInfo } from "../types";
import { useLocale } from "../providers/LanguageContext";

interface GenderButtonGroupProps {
  genderData: string[];
  userInfo: UserInfo;
  handleChange: (key: string, value: string) => void;
}
export default function GenderButtonGroup(props: GenderButtonGroupProps) {
  const {
    dictionary: { chatWindow },
  } = useLocale();
  return (
    <div className="flex flex-col w-3/5 h-3/5 rounded-2xl m-5 items-center border-2 shadow-lg shadow-black/20  justify-center bg-gray-400 bg-opacity-20 ">
      <label className="text-lg font-bold text-center text-gray-800 dark:text-gray-100  bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {chatWindow.PleaseSpecify}
      </label>
      <div className="shadow-lg shadow-slate-800/25 rounded-2xl m-2">
        <FormControl color="primary" className="bg-white" fullWidth>
          <Select
            labelId="gender-select-label"
            id="gender-select"
            value={props.userInfo.gender}
            onChange={(e) => {
              props.handleChange("gender", e.target.value as string);
            }}
          >
            {props.genderData.map((item) => (
              <MenuItem key={item} value={item}>
                <em>{item}</em>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <label className="text-lg font-bold text-center text-gray-800 dark:text-gray-100  bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {chatWindow.Gender}
      </label>
    </div>
  );
}
