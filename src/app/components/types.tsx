export interface UserInfo {
  muscleGoal: string;
  gender: string;
  age: string | number;
  activity: string;
  weight: string | number;
}
export enum SubscriptionStatus {
  Active = "active",
  Inactive = "inactive",
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
  description: string;
  description_ka: string;
  category: string;
  stripe_price_id: string;
  stripe_product_id: string;
  img_url: string;
  title_ka: string;
  images: string[];
}
export interface Blog {
  id: number;
  created_at: string;
  user_id: string;
  title: string;
  description: string;
  description_ka: string;
  category: string;
  title_ka: string;
  email: string;
}
export interface Order {
  id: number;
  created_at: string;
  user_id: string;
  total_price: number;
  stripe_purchase_id: string;
  products: OrderProducts[];
}
export interface OrderProducts {
  product_id: number;
  quantity: number;
}
export interface SubscriptionInfo {
  status: SubscriptionStatus;
  currentPeriodStart: number;
  currentPeriodEnd: number;
}
export interface EditableInputProps {
  label: string;
  value: string;
  apiEndpoint: string;
  updateButtonText: string;
}
export interface SubscriptionInfoProps {
  subscriptionInfo: SubscriptionInfo;
}
