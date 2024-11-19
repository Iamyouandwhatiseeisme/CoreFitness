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
    <div>
      <h1 className="font-serif">How many days a week do you exercise?</h1>
      <div className="w-1/2">
        <FormControl color="primary" className="bg-white " fullWidth>
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
