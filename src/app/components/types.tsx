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
  created_at: string;
  user_id: string;
  title: string;
  price: number;
  stripe_price_id: string;
  stripe_product_id: string;
  img_url: string;
}
export interface Order {
  id: string;
  created_at: string;
  user_id: string;
  total_price: number;
  stripe_purchase_id: string;
  products: {
    product_id: string;
    quantity: number;
  }[];
}
