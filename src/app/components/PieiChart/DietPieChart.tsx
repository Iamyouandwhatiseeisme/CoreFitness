import React from "react";
import { DailyDiet } from "../types";
import { valueFormatter } from "../valueFormatter";
import { PieChart } from "@mui/x-charts";

export default function DietPieChart(props: {
  dailyDiet: DailyDiet | null | undefined;
}) {
  return (
    <div className="w-1/2 bg-gray-800 shadow-lg flex flex-col items-center shadow-white bg-opacity-65 rounded-xl text-white ">
      <h1 className="font-serif text-5xl font-bold     shadow-sm shadow-gray-200 w-3/4 m-5 text-center rounded-2xl">
        Diet Chart
      </h1>
      {props.dailyDiet ? <h1>{props.dailyDiet.Calories}</h1> : ""}
      {props.dailyDiet ? (
        <PieChart
          width={300}
          slotProps={{
            legend: {
              labelStyle: {
                fontSize: 14,
                fill: "white",
              },
              direction: "column",

              padding: 0,
            },
            pieArcLabel: {
              color: "white",
            },
          }}
          series={[
            {
              data: [
                {
                  label: "Protein",
                  value: props.dailyDiet.Protein,
                  color: "green",
                },
                {
                  label: "Fat",
                  value: props.dailyDiet.Fat,
                  color: "orange",
                },
                {
                  label: "Sugar",
                  value: props.dailyDiet.Sugar,
                  color: "red",
                },
              ],
              arcLabel: (item) => `${item.value}%`,

              highlightScope: { fade: "global", highlight: "item" },
              faded: {
                innerRadius: 30,
                additionalRadius: -30,
                color: "gray",
              },

              valueFormatter,
            },
          ]}
          height={200}
        />
      ) : (
        ""
      )}
    </div>
  );
}
