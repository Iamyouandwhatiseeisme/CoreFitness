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
    <div>
      <h1 className="font-serif">Please specify your weight in KGs</h1>
      <div className=" w-1/2 ">
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
    </div>
  );
}
