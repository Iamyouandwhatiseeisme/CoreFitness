import {
  // PiBarbell,
  PiClipboardText,
  PiCreditCard,
  PiNewspaper,
  PiShoppingBagOpen,
  PiUserCircle,
  PiHouse,
} from "react-icons/pi";
import { TopPanelNavigation } from "../components/TopPanel/TopPanel";

export const TopPanelNavigationItems: TopPanelNavigation[] = [
  // { title: "equipment", icon: PiBarbell },
  { title: "blogs", icon: PiNewspaper },
  { title: "orders", icon: PiClipboardText },
  { title: "products", icon: PiShoppingBagOpen },
  { title: "profile", icon: PiUserCircle },
  { title: "pricing", icon: PiCreditCard },
  { title: "/", icon: PiHouse },
];
