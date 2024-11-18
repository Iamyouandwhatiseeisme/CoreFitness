import { useLocale } from "../providers/LanguageContext";

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
      hoverColor: "#FBBF24",
      hoverImage: "/images/Fitpass Image.png",
    },
    {
      key: 1,
      logo: "/images/Equipment Logo.jpg",
      titles: [
        informationBoard.ModernEquipment,
        informationBoard.ElectronicSystem,
      ],
      hoverColor: "#60A5FA ",
      hoverImage: "/images/Equipment Image.jpeg",
    },
    {
      key: 2,
      logo: "/images/Healthy Logo.jpg",
      titles: [informationBoard.HealthySnacks, informationBoard.Kitchen],
      hoverColor: "#A78BFA",
      hoverImage: "/images/Cafe Image.jpg",
    },
    {
      key: 3,
      logo: "/images/Pro Logo.jpg",
      titles: [
        informationBoard.CertifiedTrainers,
        informationBoard.PilatesAndYoga,
      ],
      hoverColor: "#2DD4BF ",
      hoverImage: "/images/Trainer Image.jpg",
    },
    {
      key: 4,
      logo: "/images/Branches Logo.jpg",
      titles: [
        informationBoard.BranchesOnEachSide,
        informationBoard.SubscriptionSystemForEvery,
      ],
      hoverColor: "#4ADE80 ",
      hoverImage: "/images/Branches Image.png",
    },
  ];
  return { informationBoardItems };
}
