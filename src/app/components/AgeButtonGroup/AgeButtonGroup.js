import { FormControl, MenuItem, Select } from "@mui/material";
import React from "react";

export default function AgeButtonGroup({ ageData, userInfo, handleChange }) {
  return (
    <div>
      <FormControl color="neutral" className="bg-white " fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={userInfo.age}
          onChange={(e, value) => {
            handleChange("age", value.props.value);
          }}
        >
          <MenuItem value="Age">
            <em>Age</em>
          </MenuItem>
          {ageData.map((item) => {
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
