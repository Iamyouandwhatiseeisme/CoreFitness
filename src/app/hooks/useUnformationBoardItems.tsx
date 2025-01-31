import { useLocale } from "../components/providers/LanguageContext";

export default function useInformationBoardItems() {
  const { informationBoard } = useLocale();
  const informationBoardItems = [
    {
      key: 0,
      logo: "/images/Fitpass.png",
      titles: [
        informationBoard.AccessToEveryFacility,
        informationBoard.InCaesOfUsingFacility,
      ],
      hoverColors: {
        light: "#FBBF24",
        dark: "#F59E0B",
      },
      hoverImage: "/images/Fitpass Image.png",
    },
    {
      key: 1,
      logo: "/images/Equipment Logo.jpg",
      titles: [
        informationBoard.ModernEquipment,
        informationBoard.ElectronicSystem,
      ],
      hoverColors: {
        light: "#60A5FA",
        dark: "#3B82F6",
      },
      hoverImage: "/images/Equipment Image.jpeg",
    },
    {
      key: 2,
      logo: "/images/Healthy Logo.jpg",
      titles: [informationBoard.HealthySnacks, informationBoard.Kitchen],
      hoverColors: {
        light: "#A78BFA",
        dark: "#8B5CF6",
      },
      hoverImage: "/images/Cafe Image.jpg",
    },
    {
      key: 3,
      logo: "/images/Pro Logo.jpg",
      titles: [
        informationBoard.CertifiedTrainers,
        informationBoard.PilatesAndYoga,
      ],
      hoverColors: {
        light: "#2DD4BF",
        dark: "#14B8A6",
      },
      hoverImage: "/images/Trainer Image.jpg",
    },
    {
      key: 4,
      logo: "/images/Branches Logo.jpg",
      titles: [
        informationBoard.BranchesOnEachSide,
        informationBoard.SubscriptionSystemForEvery,
      ],
      hoverColors: {
        light: "#4ADE80",
        dark: "#22C55E",
      },
      hoverImage: "/images/Branches Image.png",
    },
  ];
  return { informationBoardItems };
}
