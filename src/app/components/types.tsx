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

export interface SortOption {
  label: string;
  value: string;
  option: string;
  order: string;
}
export interface Post {
  body: string;
  id: number;
  reactions: {
    likes: string;
    dislikes: string;
  };
  tags: string[];
  title: string;
  userId: number;
  views: number;
}
