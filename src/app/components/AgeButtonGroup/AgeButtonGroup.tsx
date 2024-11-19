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
    <div>
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
  );
}
