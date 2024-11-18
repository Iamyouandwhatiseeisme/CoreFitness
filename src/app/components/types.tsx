export interface UserInfo {
  muscleGoal: string;
  gender: string;
  age: string | number;
  activity: string;
  weight: string | number;
}
export interface DailyDiet {
  Protein: number;
  Fat: number;
  Sugar: number;
  Goal: string;
  Calories: string;
}

export interface InformationBoardItem {
  key: number;
  logo: string;
  titles: string[];
  hoverColor: string;
  hoverImage: string;
}
