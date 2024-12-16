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
export interface Plan {
  reccurence: string;
  price: number;
  priceId: string;
  payementFrequency: string;
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
export interface Product {
  id: number;
  brand: string;
  category: string;
  description: string;
  price: number;
  title: string;
  thumbnail: string;
  tags: string[];
  images: string[];
}
