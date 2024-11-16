import { DailyDiet } from "../types";

export default function extractDailyDietInfo(input: string): DailyDiet {
  const goalMatch = input.match(/\*\*Goal:\*\* (.+)/);
  const goal = goalMatch ? goalMatch[1].trim() : "";

  const caloriesMatch = input.match(
    /\*\*Calorie Needs:\*\* (Approximately [\d,]+ calories per day)/
  );

  const calories = caloriesMatch ? caloriesMatch[1] : null;
  console.log(calories);

  const proteinMatch = input.match(/\*\*Protein - (\d+)%\*\*/);
  const fatMatch = input.match(/\*\*Fat - (\d+)%\*\*/);
  const sugarMatch = input.match(/\*\*Sugar - (\d+)%\*\*/);

  const protein = proteinMatch ? parseInt(proteinMatch[1], 10) : 0;
  const fat = fatMatch ? parseInt(fatMatch[1], 10) : 0;
  const sugar = sugarMatch ? parseInt(sugarMatch[1], 10) : 0;

  return {
    Protein: protein,
    Fat: fat,
    Sugar: sugar,
    Goal: goal,
    Calories: calories,
  };
}
